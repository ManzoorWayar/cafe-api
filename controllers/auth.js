import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import User from "../models/User.js";
import sendMail from "../utils/sendMail.js";
import asyncHandler from "express-async-handler";
import ResetPasswordTemplate from "../views/reset-password.js";

// @desc    Auth User & get token
// @route   POST /api/v1/User/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Check for User
	const user = await User.findOne({ email }).select("+password")

	if (!user) {
		res.status(403);
		return next(
			new Error(
				req.t("invalid credentials", { ns: "validations", key: req.t("credentials") })
			)
		);
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(
			new Error(
				req.t("invalid", { ns: "validations", key: req.t("credentials") })
			)
		);
	}
	const accessToken = await user.generateAccessToken();
	const refreshToken = await user.generateRefreshToken();

	const options = {
		httpOnly: true, //accessible only by web server
		secure: process.env.NODE_ENV === "production", //https
		SameSite: "Lux", //cross-site cookie
		maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
	};

	res.status(200).cookie("user_token", refreshToken, options).json({
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		isSuperAdmin: user.isSuperAdmin,
		accessToken,
	});
});

// @desc      Log User out / clear cookie
// @route     GET /api/v1/User/logout
// @access    Private
const logout = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.user_token) return res.sendStatus(204); //No content

	const options = {
		httpOnly: true, //accessible only by web server
		secure: process.env.NODE_ENV === "production", //https
		SameSite: "Lux", //cross-site cookie 
	};

	res.clearCookie("user_token", options);

	res.json({ message: "Cookie cleared" });
};

// @desc      Forgot password
// @route     POST /api/v1/User/forgotpassword
// @access    Public
const forgotPassword = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email })
		.select("+update_secret")
		.exec();

	if (!user) {
		res.statusCode = 400;
		throw new Error(
			req.t("not-found", { ns: "validations", key: req.t("user") })
		);
	}

	const token = speakeasy.totp({
		secret: user.update_secret.base32,
		algorithm: "sha512",
		encoding: "base32",
		step: process.env.OTP_STEP_EMAIL || 120,
	});

	user.resetPasswordToken = token;
	await user.save();

	// Create reset url
	const ipAddress = req.socket.remoteAddress;
	const recipient = { name: user.firstName, email: user.email };

	const template = new ResetPasswordTemplate(token, recipient, ipAddress);

	await sendMail({
		to: user.email,
		subject: `${req.t("reset-password")} - ${token}`,
		html: template.render(),
	});

	return res.json({ success: true, email: user.email });
});

// @desc      Reset password
// @route     PUT /api/v1/User/reset-password/:token
// @access    Public
const resetPassword = asyncHandler(async (req, res) => {
	const { otpCode, newPassword, email } = req.body;

	const user = await User.findOne({
		email,
		resetPasswordToken: otpCode,
	})
		.select("+update_secret")
		.exec();

	const verify = speakeasy.totp.verify({
		secret: user?.update_secret?.base32,
		algorithm: "sha512",
		encoding: "base32",
		token: otpCode,
		step: process.env.OTP_STEP_EMAIL || 120,
		window: 1,
	});

	if (!user || !verify) {
		res.statusCode = 400;
		throw new Error(
			req.t("invalid", { ns: "validations", key: req.t("token") })
		);
	}

	user.password = newPassword;
	user.resetPasswordToken = undefined;

	await user.save();

	return res.json({ success: true });
});

const refresh = (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.user_token)
		return res.status(401).json({ message: "no cookie Unauthorized" });

	const refreshToken = cookies.user_token

	jwt.verify(
		refreshToken,
		process.env.JWT_REFRESH_SECRET,
		async (err, decoded) => {
			if (err) return res.status(403).json({ message: "Forbidden" });

			const foundUser = await User.findById(decoded.id).exec();

			if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

			const accessToken = await foundUser.generateAccessToken();

			res.json({
				id: foundUser._id,
				firstName: foundUser.firstName,
				lastName: foundUser.lastName,
				email: foundUser.email,
				isSuperAdmin: foundUser.isSuperAdmin,
				accessToken,
			});
		}
	);
};

export default {
	login,
	forgotPassword,
	resetPassword,
	refresh,
	logout
};

import { t } from "i18next"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import speakeasy from "speakeasy"
import sendMail from "../utils/sendMail.js"
import OtpVerificationTemplate from "../views/verification-otp.js";

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "FirstName is required"],
		},
		lastName: {
			type: String,
			required: [true, "last name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			index: {
				unique: true,
			},
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please add a valid email",
			],
		},
		update_secret: {
			type: Object,
			select: false,
			default: speakeasy.generateSecret({ length: 32 }),
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: 6,
			select: false,
		},
		auth_secret: {
			type: Object,
			select: false,
			default: speakeasy.generateSecret({ length: 32 }),
		},
		isSuperAdmin: {
			type: Boolean,
			default: false,
		},
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Admin",
		},
		updaterId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Admin",
		},
		resetPasswordToken: String,
	},
	{
		timestamps: true,
	}
)

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

// Match users entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// Sign JWT and return
UserSchema.methods.generateAccessToken = async function () {
	let payload = { id: this._id }

	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	})
}

UserSchema.methods.generateRefreshToken = async function () {
	let payload = { id: this._id }

	return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.JWT_REFRESH_EXPIRE,
	})
}

const User = mongoose.model("User", UserSchema)

export default User
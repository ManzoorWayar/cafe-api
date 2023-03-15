import { checkSchema, validationResult } from "express-validator";

const errorHandler = (req, res, next) => {
  // handling validation errors
  const validationErrs = validationResult(req);
  if (!validationErrs.isEmpty()) {
    return res.status(400).json({ errors: validationErrs.array() });
  }
  next();
};

const loginSchema = checkSchema({
  email: {
    escape: true,
    trim: true,
    isEmail: {
      bail: true,
      errorMessage: (_, { req }) => req.t("invalid", { ns: 'validations', key: req.t("email") })
    },
    normalizeEmail: true,
    custom: {
      options: (value, { req }) => {
        if (
          req.email === undefined &&
          (value === undefined || value === null || value === '')
        ) {
          return Promise.reject(req.t("required", { ns: 'validations', key: req.t("email") }));
        }

        return Promise.resolve();
      },
    }
  },
  password: {
    escape: true,
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (
          (req.password === undefined || req.password.length === '') &&
          (value === undefined || value === null || value === '')
        ) {
          return Promise.reject(req.t("required", { ns: 'validations', key: req.t("password") }));
        }

        return Promise.resolve();
      },
    }
  }
});

const forgotPasswordSchema = checkSchema({
  email: {
    escape: true,
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: (_, { req }) => req.t("invalid", { ns: 'validations', key: req.t("email") })
    },
    normalizeEmail: true,
    isEmail: {
      bail: true,
      errorMessage: (_, { req }) => req.t("invalid", { ns: 'validations', key: req.t("email") })
    }
  },
});

const resetPasswordSchema = checkSchema({
  email: {
    escape: true,
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: (_, { req }) => req.t("invalid", { ns: 'validations', key: req.t("email") })
    },
    normalizeEmail: true,
    isEmail: {
      bail: true,
      errorMessage: (_, { req }) => req.t("invalid", { ns: 'validations', key: req.t("email") })
    }
  },
  otpCode: {
    escape: true,
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: (_, { req }) => req.t("required", { ns: 'validations', key: req.t("otpCode") })
    },
  },
  newPassword: {
    escape: true,
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: (_, { req }) => req.t("required", { ns: 'validations', key: req.t("new-password") })
    },
    // isStrongPassword: {
    //   errorMessage: (_, { req }) => req.t("provide", { ns: 'validations', key: req.t("strong-password") })
    // },
  },
  confirmPassword: {
    escape: true,
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: (_, { req }) => req.t("required", { ns: 'validations', key: req.t('confirm-password') })
    },
    custom: {
      options: (value, { req }) => {
        if (value === req.body.newPassword) {
          return Promise.resolve()
        }
      },
      errorMessage: (_, { req }) => req.t("confirm-password", { ns: 'validations' })
    }
  },
});

export default {
  login: [loginSchema, errorHandler],
  forgotPassword: [forgotPasswordSchema, errorHandler],
  resetPassword: [resetPasswordSchema, errorHandler]
};

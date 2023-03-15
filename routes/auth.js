import express from 'express'
import authController from '../controllers/auth.js'
import authValidator from '../middleware/validators/auth.js'
// import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

// router.use(verifyJWT)

router.route('/login')
	.post(authValidator.login, authController.login)

router.route('/refresh')
	.get(authController.refresh)

router.route('/resend-token')
	.post(authValidator.forgotPassword, authController.forgotPassword)

router.route('/forgot-password')
	.post(authValidator.forgotPassword, authController.forgotPassword)

router.route('/reset-password')
	.put(authValidator.resetPassword, authController.resetPassword)

router.route('/logout')
	.post(authController.logout)

export default router
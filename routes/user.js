import express from 'express'
import userController from '../controllers/user.js'
// import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

// router.use(verifyJWT)

router.route('/register')
    .post(userController.createUser)


export default router
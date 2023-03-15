import asyncHandler from "express-async-handler"
import User from "../models/User.js"

// @desc    Create an admin by SuperAdmin
// @route   POST /api/v1/admin/admin-users
// @access  private/superAdmin
const createUser = asyncHandler(async (req, res) => {
    const { user, body } = req;

    body.creatorId = user?.id;

    const newUser = await User.create(body);

    res.status(201).json(newUser);
})

const userController = {
    createUser
}

export default userController
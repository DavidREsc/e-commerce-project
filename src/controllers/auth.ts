import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/User";
import Cart from "../models/Cart";
import { Request, Response, NextFunction } from "express";
import sendTokenResponse from "../utils/sendTokenResponse";
import { IRequest } from "../types";


// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {firstName, lastName, email, password, role} = req.body

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword: password,
        role
    })

    await Cart.create({
        userId: user._id
    })

    sendTokenResponse(user, 200, res)
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body

    // Validate email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and passowrd', 400))
    }

    // Check for user
    const user = await User.findOne({email}).select('+hashedPassword')

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    sendTokenResponse(user, 200, res)
})

// @desc    Login demo
// @route   GET /api/v1/auth/demo
// @access  Public
export const demo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const email = 'admin@gmail.com'
    const password = 'adminpass13$'

    // Validate email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and passowrd', 400))
    }

    // Check for user
    const user = await User.findOne({email}).select('+hashedPassword')

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    sendTokenResponse(user, 200, res)
})

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (req: IRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user!._id)
    res.status(200).json({
        success: true,
        user
    })
})



import jwt, { JwtPayload } from 'jsonwebtoken'
import asyncHandler from './asyncHandler'
import ErrorResponse from '../utils/errorResponse'
import User from '../models/User'
import { Request, Response, NextFunction } from 'express'
import { IRequest } from '../types'


// Protect routes
export const protect = asyncHandler(async (req: IRequest, res: Response, next: NextFunction) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } 

    else if (req.cookies.token) {
        token = req.cookies.token
    }

    // Make sure token exists
    if (!token) return next(new ErrorResponse('Not authorized to access this route', 401))

    const secret = process.env.JWT_SECRET
    if (secret) {
        const decoded = jwt.verify(token, secret) 
        console.log(decoded)
        req.user = await User.findById((<JwtPayload>decoded).id)
    } else {
       return next(new ErrorResponse('JWT secret not found in .env file', 500))
    }
    
    next()
})

type TRoles = [
    role: string
]

// Grant access to specific roles
export const authorize = (...roles: TRoles) => {
    return (req: IRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user!.role)) {
            return next(new ErrorResponse(`User role ${req.user!.role} is not authorized to access this route`, 403))
        }
        next()
    }
}
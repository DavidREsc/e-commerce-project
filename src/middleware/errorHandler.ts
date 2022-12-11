import {Request, Response, NextFunction, ErrorRequestHandler} from 'express'
import colors from 'colors'
import ErrorResponse from '../utils/errorResponse'

interface Error {
    name: string
    message: string
    stack?: string
    code?: number
    statusCode?: number
    value?: string
    errors?: object
}

// Custom error handler middleware
const errorHandler = (e: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(colors.red.inverse(e.message))
    let error = {...e}
    error.message = e.message

    // Mongoose duplicate key error
    if (e.code === 11000) {
        const message = 'Duplicate field value'
        error = new ErrorResponse(message, 400)
    }

    // Mongoose document not found
    if (e.name === 'CastError') {
        const message = `Resource not found with id of ${e.value}`
        error = new ErrorResponse(message, 404)
    }

    // Mongoose validation error
    if (e.name === 'ValidationError') {
        const message = Object.values(<any>(e.errors)).map((val: any) => val.message).join(',')
        error = new ErrorResponse(message, 400)
    }

    // JsonWebTokenError
    if (e.name === 'JsonWebTokenError') {
        const message = 'Not authorized'
        error = new ErrorResponse(message, 401)
    }

    res.status(error?.statusCode || 500).json({
        success: false,
        error: error?.message || 'Server Error'
    })
}

export default errorHandler

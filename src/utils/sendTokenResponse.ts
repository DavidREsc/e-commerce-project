import { IUser } from "../models/User";
import { Response } from "express";

// Get token from model, create cookie and send response
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
    // Create token
    const token = user.getSignedJwtToken()
    const cookieExpire: any = process.env.JWT_COOKIE_EXPIRE

    const options = {
        expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false
    }

    //if (process.env.NODE_ENV === 'production') options.secure = true

    res.status(statusCode)
       .cookie('token', token, options)
       .json({
        success: true,
        token,
        user: user['hashedPassword'] ? omit('hashedPassword', user) : user
       })
}

const omit = (key: string, obj: any) => {
    obj[key] = null
    return obj
}

export default sendTokenResponse

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
    const cookieExpire = process.env.JWT_COOKIE_EXPIRE;
    const options = {
        expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false
    };
    //if (process.env.NODE_ENV === 'production') options.secure = true
    res.status(statusCode)
        .cookie('token', token, options)
        .json({
        success: true,
        token,
        user: user['hashedPassword'] ? omit('hashedPassword', user) : user
    });
};
const omit = (key, obj) => {
    obj[key] = null;
    return obj;
};
exports.default = sendTokenResponse;

import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt, { Jwt } from 'jsonwebtoken'
import ErrorResponse from '../utils/errorResponse'

export interface IShippingAddress {
    country: string,
    address1: string,
    address2: string,
    city: string,
    province: string,
    postalCode: string
}

export interface IUser {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    shippingAddress?: IShippingAddress[]
    role: string,
    hashedPassword: string,
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    createdAt: Date,
    getSignedJwtToken(): Jwt
    matchPassword(p: string): boolean
}

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: [true, 'Please add first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            'Please add a valid email'
        ]
    },
    shippingAddress: [{
        country: {
            type: String,
            required: [true, 'Please add a country']
        },
        address1: {
            type: String,
            required: [true, 'Please add an address']
        },
        address2: String,
        city: {
            type: String,
            required: [true, 'Please add a city']
        },
        province: {
            type: String,
            required: [true, 'Please add a province']
        },
        postalCode: {
            type: String,
            required: [true, 'Please add a postal code']
        }
    }],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    hashedPassword: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt)
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    const secret = process.env.JWT_SECRET
    if (secret) {
        return jwt.sign({id: this._id}, secret, {
            expiresIn: process.env.JWT_EXPIRE
        })
    } else {
        throw new ErrorResponse("JWT secret not found in .env file", 404)
    }
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.hashedPassword)
}


export default model('User', UserSchema)

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const UserSchema = new mongoose_1.Schema({
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
});
// Encrypt password using bcrypt
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.hashedPassword = yield bcryptjs_1.default.hash(this.hashedPassword, salt);
    });
});
// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    const secret = process.env.JWT_SECRET;
    if (secret) {
        return jsonwebtoken_1.default.sign({ id: this._id }, secret, {
            expiresIn: process.env.JWT_EXPIRE
        });
    }
    else {
        throw new errorResponse_1.default("JWT secret not found in .env file", 404);
    }
};
// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.hashedPassword);
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);

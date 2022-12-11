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
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const User_1 = __importDefault(require("../models/User"));
// Protect routes
exports.protect = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.token) {
        token = req.cookies.token;
    }
    // Make sure token exists
    if (!token)
        return next(new errorResponse_1.default('Not authorized to access this route', 401));
    const secret = process.env.JWT_SECRET;
    if (secret) {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log(decoded);
        req.user = yield User_1.default.findById(decoded.id);
    }
    else {
        return next(new errorResponse_1.default('JWT secret not found in .env file', 500));
    }
    next();
}));
// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new errorResponse_1.default(`User role ${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    };
};
exports.authorize = authorize;

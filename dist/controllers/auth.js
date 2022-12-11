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
exports.getMe = exports.demo = exports.login = exports.register = void 0;
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const User_1 = __importDefault(require("../models/User"));
const Cart_1 = __importDefault(require("../models/Cart"));
const sendTokenResponse_1 = __importDefault(require("../utils/sendTokenResponse"));
// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, role } = req.body;
    // Create user
    const user = yield User_1.default.create({
        firstName,
        lastName,
        email,
        hashedPassword: password,
        role
    });
    yield Cart_1.default.create({
        userId: user._id
    });
    (0, sendTokenResponse_1.default)(user, 200, res);
}));
// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validate email and password
    if (!email || !password) {
        return next(new errorResponse_1.default('Please provide an email and passowrd', 400));
    }
    // Check for user
    const user = yield User_1.default.findOne({ email }).select('+hashedPassword');
    if (!user) {
        return next(new errorResponse_1.default('Invalid credentials', 401));
    }
    // Check if password matches
    const isMatch = yield user.matchPassword(password);
    if (!isMatch) {
        return next(new errorResponse_1.default('Invalid credentials', 401));
    }
    (0, sendTokenResponse_1.default)(user, 200, res);
}));
// @desc    Login demo
// @route   GET /api/v1/auth/demo
// @access  Public
exports.demo = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = 'admin@gmail.com';
    const password = 'adminpass13$';
    // Validate email and password
    if (!email || !password) {
        return next(new errorResponse_1.default('Please provide an email and passowrd', 400));
    }
    // Check for user
    const user = yield User_1.default.findOne({ email }).select('+hashedPassword');
    if (!user) {
        return next(new errorResponse_1.default('Invalid credentials', 401));
    }
    // Check if password matches
    const isMatch = yield user.matchPassword(password);
    if (!isMatch) {
        return next(new errorResponse_1.default('Invalid credentials', 401));
    }
    (0, sendTokenResponse_1.default)(user, 200, res);
}));
// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    });
}));

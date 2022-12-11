"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// Custom error handler middleware
const errorHandler = (e, req, res, next) => {
    console.log(colors_1.default.red.inverse(e.message));
    let error = Object.assign({}, e);
    error.message = e.message;
    // Mongoose duplicate key error
    if (e.code === 11000) {
        const message = 'Duplicate field value';
        error = new errorResponse_1.default(message, 400);
    }
    // Mongoose document not found
    if (e.name === 'CastError') {
        const message = `Resource not found with id of ${e.value}`;
        error = new errorResponse_1.default(message, 404);
    }
    // Mongoose validation error
    if (e.name === 'ValidationError') {
        const message = Object.values((e.errors)).map((val) => val.message).join(',');
        error = new errorResponse_1.default(message, 400);
    }
    // JsonWebTokenError
    if (e.name === 'JsonWebTokenError') {
        const message = 'Not authorized';
        error = new errorResponse_1.default(message, 401);
    }
    res.status((error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({
        success: false,
        error: (error === null || error === void 0 ? void 0 : error.message) || 'Server Error'
    });
};
exports.default = errorHandler;

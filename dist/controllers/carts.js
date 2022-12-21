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
exports.deleteCart = exports.getCart = exports.deleteItem = exports.addItem = exports.createCart = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const Cart_1 = __importDefault(require("../models/Cart"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
exports.createCart = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.create(req.user._id);
    if (!cart)
        return next(new errorResponse_1.default(`Failed to create cart with user id ${req.user._id}`, 500));
    res.status(200).json({
        success: true,
        data: cart
    });
}));
exports.addItem = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let item;
    // Increment quantity of item if exists in cart
    item = yield Cart_1.default.findOneAndUpdate({ userId: req.user._id, products: { $elemMatch: { productId: req.params.id } } }, { $inc: { "products.$.quantity": req.body.quantity } }, {
        new: true,
        runValidators: true
    }).populate({
        path: 'products.productId',
        select: ['title', 'price', 'image']
    });
    // If item doesn't exist in cart, push new product and quantity to cart
    if (!item) {
        item = yield Cart_1.default.findOneAndUpdate({ userId: req.user._id }, { $push: { products: { productId: req.params.id, quantity: req.body.quantity } } }, {
            new: true,
            runValidators: true
        });
    }
    res.status(200).json({
        success: true,
        data: item
    });
}));
exports.deleteItem = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findOneAndUpdate({ userId: req.user._id }, { $pull: { products: { productId: { _id: req.params.id } } } }, {
        new: true,
        runValidators: true
    })
        .populate({
        path: 'products.productId',
        select: ['title', 'price', 'image']
    });
    if (!cart)
        next(new errorResponse_1.default(`Product not found with id ${req.params.id}`, 404));
    res.status(200).json({
        success: true,
        data: cart
    });
}));
exports.getCart = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findOne({ userId: req.user._id }).populate({
        path: 'products.productId',
        select: ['title', 'price', 'image', 'categories']
    });
    res.status(200).json({
        success: true,
        data: cart
    });
}));
exports.deleteCart = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findOneAndUpdate({ userId: req.user._id }, { $set: { products: [] } }, {
        new: true,
        runValidators: true
    });
    if (!cart)
        next(new errorResponse_1.default(`Cart not found for user id ${req.user._id}`, 404));
    res.status(200).json({
        success: true,
        data: cart
    });
}));

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
exports.deleteProduct = exports.updateProducts = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find();
    res.status(200).json(res.results);
}));
// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(req.params.id);
    if (!product)
        return next(new errorResponse_1.default(`Product not found with id ${req.params.id}`, 404));
    res.status(200).json({
        success: true,
        data: product
    });
}));
// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.create(req.body);
    res.status(201).json({
        success: true,
        data: product
    });
}));
// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!product)
        return next(new errorResponse_1.default(`Product not found with id ${req.params.id}`, 404));
    res.status(200).json({
        success: true,
        data: product
    });
}));
// @desc    Update many products
// @route   PUT /api/v1/products
// @access  Private
exports.updateProducts = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let products = yield Promise.all(req.body.products.map((p) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield Product_1.default.findByIdAndUpdate(p.id, p.fields, {
            new: true,
            runValidators: true
        });
        if (!product)
            return next(new errorResponse_1.default(`Product not found with id ${p.id}`, 404));
        return product;
    })));
    res.status(200).json({
        success: true,
        data: products
    });
}));
// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(req.params.id);
    if (!product)
        return next(new errorResponse_1.default(`Product not found with id ${req.params.id}`, 404));
    yield product.remove();
    res.status(200).json({
        success: true,
        data: {}
    });
}));

import Product from "../models/Product"
import {Request, Response, NextFunction} from 'express'
import asyncHandler from "../middleware/asyncHandler"
import {IResponse} from '../types'
import ErrorResponse from "../utils/errorResponse"

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: IResponse, next: NextFunction) => {
    const products = await Product.find()
    res.status(200).json(res.results)
})

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorResponse(`Product not found with id ${req.params.id}`, 404))
    res.status(200).json({
        success: true,
        data: product
    })
})

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private
export const createProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        data: product
    })
})

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private
export const updateProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!product) return next(new ErrorResponse(`Product not found with id ${req.params.id}`, 404))
    res.status(200).json({
        success: true,
        data: product
    })
})

// @desc    Update many products
// @route   PUT /api/v1/products
// @access  Private
export const updateProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let products: any = await Promise.all(req.body.products.map(async (p: any) => {
        const product = await Product.findByIdAndUpdate(p.id, p.fields, {
            new: true,
            runValidators: true
        })
        if (!product) return next(new ErrorResponse(`Product not found with id ${p.id}`, 404))
        return product
    }))

    res.status(200).json({
        success: true,
        data: products
    })
})

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorResponse(`Product not found with id ${req.params.id}`, 404))
    await product.remove()
    res.status(200).json({
        success: true,
        data: {}
    })
})

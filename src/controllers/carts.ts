import asyncHandler from "../middleware/asyncHandler";
import {Request, Response, NextFunction} from 'express'
import Cart from '../models/Cart'
import { IRequest } from "../types";
import ErrorResponse from "../utils/errorResponse"

export const createCart = asyncHandler(async (req: IRequest, res: Response, next: NextFunction) => {
    const cart = await Cart.create(req.user!._id)
    if (!cart) return next(new ErrorResponse(`Failed to create cart with user id ${req.user!._id}`, 500))
    res.status(200).json({
        success: true,
        data: cart
    })
})

export const addItem = asyncHandler(async (req: IRequest, res: Response, next: NextFunction) => {
    let item
    console.log(req.body.quantity)

    // Increment quantity of item if exists in cart
    item = await Cart.findOneAndUpdate({userId: req.user!._id, products: {$elemMatch: {productId: req.params.id}}},
        {$inc: {"products.$.quantity": req.body.quantity}}, {
            new: true,
            runValidators: true
        }).populate({
            path: 'products.productId',
            select: ['title', 'price', 'image']
        })
    // If item doesn't exist in cart, push new product and quantity to cart
    if (!item) {
        item = await Cart.findOneAndUpdate({userId: req.user!._id}, {$push: {products: {productId: req.params.id, quantity: req.body.quantity}}}, {
            new: true,
            runValidators: true
        })
    }
    res.status(200).json({
        success: true,
        data: item
    })
})

export const deleteItem = asyncHandler(async (req: IRequest, res: Response, next: NextFunction) => {
    const cart = await Cart.findOneAndUpdate({userId: req.user!._id},
        {$pull: {products: {productId: {_id: req.params.id}}}}, {
            new: true,
            runValidators: true
        })
        .populate({
            path: 'products.productId',
            select: ['title', 'price', 'image']
        })

    if (!cart) next(new ErrorResponse(`Product not found with id ${req.params.id}`, 404))
    res.status(200).json({
        success: true,
        data: cart
    })
})

export const getCart = asyncHandler(async (req: IRequest, res: Response, next: NextFunction) => {
    const cart = await Cart.findOne({userId: req.user!._id}).populate({
        path: 'products.productId',
        select: ['title', 'price', 'image', 'categories']
    })
    res.status(200).json({
        success: true,
        data: cart
    })
})

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Processed', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Processed'
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    items: [{
            title: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }],
    shippingAddress: {
        country: {
            type: String,
            required: true
        },
        address1: {
            type: String,
            required: true
        },
        address2: String,
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)('Order', OrderSchema);

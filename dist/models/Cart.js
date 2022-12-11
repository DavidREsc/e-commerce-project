"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: [1, 'Quantity must be at least 1']
            }
        }]
});
exports.default = (0, mongoose_1.model)('Cart', CartSchema);

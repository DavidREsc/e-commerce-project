"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    quantity: {
        type: Number,
        required: [true, 'Please add a quantity'],
        min: 0
    },
    categories: {
        type: [String],
        required: [true, 'Please add a category'],
        enum: [
            'electronics',
            'jewelery',
            'men\'s clothing',
            'women\'s clothing'
        ]
    },
    image: {
        type: String,
        required: [true, 'Please add an image filename/url'],
    },
    rating: {
        rate: {
            type: Number,
            min: 0,
            max: 5
        },
        count: {
            type: Number
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)('Product', ProductSchema);

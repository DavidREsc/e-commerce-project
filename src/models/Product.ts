import {Schema, model} from 'mongoose'

type Rating = {
    rate: number
    count: number
}

interface IProduct {
    title: string
    description: string
    price: number
    quantity: number
    categories: string[]
    image: string
    rating?: Rating
    createdAt: Date
    modifiedAt?: Date
}

const ProductSchema = new Schema<IProduct>({
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
})

export default model('Product', ProductSchema)

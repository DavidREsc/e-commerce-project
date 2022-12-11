import {Schema, model, Types} from 'mongoose'

interface IProduct {
    productId: string,
    quantity: number
}

interface ICart {
    userId: Types.ObjectId,
    products?: IProduct[]
}

const CartSchema = new Schema<ICart>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
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
})

export default model('Cart', CartSchema)

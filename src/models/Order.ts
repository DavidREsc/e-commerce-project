import {model, Schema, Types} from 'mongoose'
import {IShippingAddress} from './User'

interface TItem {
    title: string,
    quantity: number,
    price: number
}

interface IOrder {
    userId: Types.ObjectId,
    status: string,
    amount: number,
    items: TItem[],
    shippingAddress: IShippingAddress,
    createdAt: Date
}

const OrderSchema = new Schema<IOrder>({
    userId: {
        type: Schema.Types.ObjectId,
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

})

export default model('Order', OrderSchema)

import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    const uri = process.env.MONGO_URI
    if (uri) {
        const conn = await mongoose.connect(uri)
        console.log(colors.magenta.underline(`MongoDB Connected: ${conn.connection.host}`))
    } else {
        throw new Error(colors.red.underline('Failed to connect to MongoDB'))
    }
}

export default connectDB

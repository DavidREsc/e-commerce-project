import express, {Application, Request, Response} from 'express'
import * as dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './db/connectDB'
import errorHandler from './middleware/errorHandler'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'


// Load environment variables
dotenv.config()
const PORT: string | number = process.env.PORT || 7000

// Connect to database
connectDB()

// Get route files
import products from './routes/products'
import checkout from './routes/checkout'
import carts from './routes/carts'
import auth from './routes/auth'
//import { handleWebhook } from './controllers/checkout'

// Create an express server
const app: Application = express()

// Body parser
app.use(express.json())


// Cookie parser
app.use(cookieParser())
app.use(cors())

// Mount routers
app.use('/api/v1/products', products)
app.use('/api/v1/checkout', checkout)
app.use('/api/v1/carts', carts)
app.use('/api/v1/auth', auth)
app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))
}

// Catch route
app.get('/*', (req, res) => {
    res.sendFile('../client/dist/index.html', {root: __dirname});
})


// Start server
const server = app.listen(PORT, () => {
    console.log(colors.blue.bold(`Server running on port ${PORT}`))
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (e: Error, promise) => {
    console.log(colors.red.inverse(`Unhandled error: ${e.message}`))
    // Close sever and exit process
    server.close(() => process.exit(1))
})
import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
import * as dotenv from 'dotenv'

// Load models
import Product from './models/Product'

// Load env variables
dotenv.config()
const uri: string | undefined = process.env.MONGO_URI

// Connect to database
if (uri) {
    mongoose.connect(uri)
}
else {
    console.log('Missing environment variables')
    process.exit()
}

// Read JSON files
const products = JSON.parse(fs.readFileSync(`${__dirname}/../_data/products.json`, 'utf-8'))

// Import data into DB
const importData = async () => {
    try {
        await Product.create(products)
        console.log(colors.green.inverse('Data Imported...'))
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

// Delete data from DB
const deleteData = async () => {
    try {
        await Product.deleteMany()
        console.log(colors.red.inverse('Data Deleted...'))
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

// Import or Delete data based on argv
if (process.argv[2] === '-i') importData()
else if (process.argv[2] === '-d') deleteData()

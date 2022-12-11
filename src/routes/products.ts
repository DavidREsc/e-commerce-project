import express, {IRouter} from 'express'
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
    updateProducts
} from '../controllers/products'

import Product from '../models/Product'
import queryHandler from '../middleware/queryHandler'
import { protect, authorize } from '../middleware/auth'

const router: IRouter = express.Router()

router.route('/')
    .get(queryHandler(Product, ''), getProducts)
    .post(protect, authorize('admin'), createProduct)
    .put(protect, authorize('admin'), updateProducts)

router.route('/:id')
    .get(getProduct)
    .put(protect, authorize('admin'), updateProduct)
    .delete(protect, authorize('admin'), deleteProduct)

export default router

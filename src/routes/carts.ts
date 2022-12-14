import {IRouter, Router} from 'express'
import { addItem, createCart, deleteCart, deleteItem, getCart } from '../controllers/carts'
import { protect } from '../middleware/auth'


const router: IRouter = Router()

router.route('/')
    .post(protect, createCart)
    .get(protect, getCart)
    .delete(protect, deleteCart)


router.route('/:id')
    .put(protect, addItem)
    .delete(protect, deleteItem)


export default router

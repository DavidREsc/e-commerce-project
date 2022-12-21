import {IRouter, Router} from 'express'
import { checkout, getPaymentSession } from '../controllers/checkout'
import { protect, authorize } from '../middleware/auth'

const router: IRouter = Router()

router.route('/')
    .post(protect, checkout)

router.route('/:id')
    .get(protect, getPaymentSession)

export default router

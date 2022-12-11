import {IRouter, Router} from 'express'
import { checkout } from '../controllers/checkout'
import { protect, authorize } from '../middleware/auth'

const router: IRouter = Router()

router.route('/')
    .post(protect, checkout)



export default router

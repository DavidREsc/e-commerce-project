import {IRouter, Router} from 'express'
import { demo, getMe, login, register } from '../controllers/auth'
import { protect } from '../middleware/auth'
import { createCart } from '../controllers/carts'

const router: IRouter = Router()

router.route('/register')
    .post(register, createCart)

router.route('/login')
    .post(login)

router.route('/demo')
    .get(demo)

router.route('/me')
    .get(protect, getMe)

export default router

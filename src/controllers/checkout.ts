import {Request, Response, NextFunction} from 'express'
import asyncHandler from '../middleware/asyncHandler'
import Product from '../models/Product'
import ErrorResponse from '../utils/errorResponse'
import { getProducts } from './products'
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

interface IProductCheckout {
    title: string,
    price: number,
    quantity: number
}

type TProductTitles = { title: string[] }

export const checkout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    // Get product titles from req.body.products and store in object
    const productTitles: TProductTitles = {"title": []}
    const titles: string[] = []
    req.body.products.forEach((p: IProductCheckout) => titles.push(p.title))
    productTitles['title'] = titles

    // Retrieve products from database using product titles
    const products = await Product.find(productTitles)

    // Check available quantity of product
    for (let i = 0; i < products.length; i++) {
        // Checkout quantity exceeds available quantity
        if (products[i].quantity < req.body.products[i].quantity) {
            return next(new ErrorResponse(`Exceeded available quantity of ${products[i].quantity} for ${req.body.products[i].title}`, 400))
        } 
        // Update new available quantity
        else {
            await Product.findByIdAndUpdate(products[i]._id, {quantity: products[i].quantity - req.body.products[i].quantity})
        }
    }

    // Create stripe payment session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        invoice_creation: {enabled: true},
        line_items: req.body.products.map((product: IProductCheckout) => {
            return {
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: product.title
                    },
                    unit_amount: product.price * 100
                },
                quantity: product.quantity
            }
        }),
        success_url: process.env.NODE_ENV === 'development' ? `${process.env.CLIENT_URL}/order/success/{CHECKOUT_SESSION_ID}` : `${process.env.PRODUCTION_URL}/l`,
        cancel_url: process.env.NODE_ENV === 'development' ? `${process.env.CLIENT_URL}/cart` : `${process.env.PRODUCTION_URL}/cart`
    })

    // Return checkout session url
    res.status(200).json({
        success: true,
        stripeSession: session.url
    })
})

export const getPaymentSession = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.params.id
    console.log(sessionId)
    // Retrieve stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    // No session found
    if (!session) next(new ErrorResponse(`Stripe session with id of ${sessionId} not found`, 404))
    res.status(200).json({
      success: true,
      stripeSession: session
    })

})








































/*const endpointSecret = 'whsec_138f55fc3a6f3c16e493e89babb493dba826bee3eacc6e21fdc4fbe2aaf62642'

export const handleWebhook = (req: Request, res: Response) => {
    let event = req.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err);
        return res.sendStatus(400);
      }
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('payment intent succeeded')
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      case 'payment_intent.created':
        console.log('Payment intent created')
        break;
      case 'payment_intent_processing':
        console.log('processing')
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    res.send();
   
};
  */

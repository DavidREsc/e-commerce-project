"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const Product_1 = __importDefault(require("../models/Product"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
exports.checkout = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // Get product titles from req.body.products and store in object
    const productTitles = { "title": [] };
    const titles = [];
    req.body.products.forEach((p) => titles.push(p.title));
    productTitles['title'] = titles;
    // Retrieve products from database using product titles
    const products = yield Product_1.default.find(productTitles);
    // Check available quantity of product
    for (let i = 0; i < products.length; i++) {
        // Checkout quantity exceeds available quantity
        if (products[i].quantity < req.body.products[i].quantity) {
            return next(new errorResponse_1.default(`Exceeded available quantity of ${products[i].quantity} for ${req.body.products[i].title}`, 400));
        }
        // Update new available quantity
        else {
            yield Product_1.default.findByIdAndUpdate(products[i]._id, { quantity: products[i].quantity - req.body.products[i].quantity });
        }
    }
    // Create stripe payment session
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.products.map((product) => {
            return {
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: product.title
                    },
                    unit_amount: product.price * 100
                },
                quantity: product.quantity
            };
        }),
        success_url: process.env.NODE_ENV === 'development' ? `${process.env.CLIENT_URL}/` : '/',
        cancel_url: process.env.NODE_ENV === 'development' ? `${process.env.CLIENT_URL}/cart` : '/cart'
    });
    console.log("Creating session", session.url);
    // Return checkout session url
    res.status(200).json({
        success: true,
        stripeSession: session.url
    });
}));
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const Product_1 = __importDefault(require("../models/Product"));
const queryHandler_1 = __importDefault(require("../middleware/queryHandler"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get((0, queryHandler_1.default)(Product_1.default, ''), products_1.getProducts)
    .post(auth_1.protect, (0, auth_1.authorize)('admin'), products_1.createProduct)
    .put(auth_1.protect, (0, auth_1.authorize)('admin'), products_1.updateProducts);
router.route('/:id')
    .get(products_1.getProduct)
    .put(auth_1.protect, (0, auth_1.authorize)('admin'), products_1.updateProduct)
    .delete(auth_1.protect, (0, auth_1.authorize)('admin'), products_1.deleteProduct);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carts_1 = require("../controllers/carts");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.route('/')
    .post(auth_1.protect, carts_1.createCart)
    .get(auth_1.protect, carts_1.getCart);
router.route('/:id')
    .put(auth_1.protect, carts_1.addItem)
    .delete(auth_1.protect, carts_1.deleteItem);
exports.default = router;

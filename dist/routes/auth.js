"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const carts_1 = require("../controllers/carts");
const router = (0, express_1.Router)();
router.route('/register')
    .post(auth_1.register, carts_1.createCart);
router.route('/login')
    .post(auth_1.login);
router.route('/demo')
    .get(auth_1.demo);
router.route('/me')
    .get(auth_2.protect, auth_1.getMe);
exports.default = router;

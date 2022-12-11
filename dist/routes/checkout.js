"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkout_1 = require("../controllers/checkout");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.route('/')
    .post(auth_1.protect, checkout_1.checkout);
exports.default = router;

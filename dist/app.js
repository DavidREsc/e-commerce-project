"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 7000;
// Connect to database
(0, connectDB_1.default)();
// Get route files
const products_1 = __importDefault(require("./routes/products"));
const checkout_1 = __importDefault(require("./routes/checkout"));
const carts_1 = __importDefault(require("./routes/carts"));
const auth_1 = __importDefault(require("./routes/auth"));
//import { handleWebhook } from './controllers/checkout'
// Create an express server
const app = (0, express_1.default)();
// Body parser
app.use(express_1.default.json());
// Cookie parser
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// Mount routers
app.use('/api/v1/products', products_1.default);
app.use('/api/v1/checkout', checkout_1.default);
app.use('/api/v1/carts', carts_1.default);
app.use('/api/v1/auth', auth_1.default);
app.use(errorHandler_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
}
// Catch route
app.get('/*', (req, res) => {
    res.sendFile('../client/dist/index.html', { root: __dirname });
});
// Start server
const server = app.listen(PORT, () => {
    console.log(colors_1.default.blue.bold(`Server running on port ${PORT}`));
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (e, promise) => {
    console.log(colors_1.default.red.inverse(`Unhandled error: ${e.message}`));
    // Close sever and exit process
    server.close(() => process.exit(1));
});

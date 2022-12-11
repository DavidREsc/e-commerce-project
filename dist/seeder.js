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
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const dotenv = __importStar(require("dotenv"));
// Load models
const Product_1 = __importDefault(require("./models/Product"));
// Load env variables
dotenv.config();
const uri = process.env.MONGO_URI;
// Connect to database
if (uri) {
    mongoose_1.default.connect(uri);
}
else {
    console.log('Missing environment variables');
    process.exit();
}
// Read JSON files
const products = JSON.parse(fs_1.default.readFileSync(`${__dirname}/../_data/products.json`, 'utf-8'));
// Import data into DB
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.create(products);
        console.log(colors_1.default.green.inverse('Data Imported...'));
        process.exit();
    }
    catch (e) {
        console.log(e);
    }
});
// Delete data from DB
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.deleteMany();
        console.log(colors_1.default.red.inverse('Data Deleted...'));
        process.exit();
    }
    catch (e) {
        console.log(e);
    }
});
// Import or Delete data based on argv
if (process.argv[2] === '-i')
    importData();
else if (process.argv[2] === '-d')
    deleteData();

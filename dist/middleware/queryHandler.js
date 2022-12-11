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
Object.defineProperty(exports, "__esModule", { value: true });
// Custom query handler middleware
const queryHandler = (model, populate) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Query variable used to build a query
    let query;
    // Copy req.query
    const reqQuery = Object.assign({}, req.query);
    // Fields to remove
    const removeFields = ['sort', 'order'];
    // Remove fields from copied query
    removeFields.forEach(param => delete reqQuery[param]);
    // Find resource with modified query
    query = model.find(reqQuery);
    // Sort resources
    if (req.query.sort) {
        const sortBy = {};
        const sort = req.query.sort;
        let order;
        if (req.query.order) {
            order = req.query.order;
        }
        else
            order = 'desc';
        sortBy[sort] = order;
        query = query.sort(sortBy);
    }
    // Executing the query
    const results = yield query;
    // Attach results to response ojbect
    res.results = {
        success: true,
        count: results.length,
        data: results
    };
    next();
});
exports.default = queryHandler;

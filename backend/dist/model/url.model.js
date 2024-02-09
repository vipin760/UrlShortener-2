"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var urlSchema = new mongoose_1.Schema({
    shortUrl: { type: String, require: true, unique: true },
    redirectUrl: { type: String, require: true },
    visitHistory: [{ timestamp: { type: Number } }],
}, { timestamps: true });
var UrlModel = (0, mongoose_1.model)('url', urlSchema);
exports.default = UrlModel;

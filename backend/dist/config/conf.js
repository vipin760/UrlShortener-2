"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = require("mongoose");
var dbConnect = function () {
    try {
        (0, mongoose_1.connect)(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(function () {
            console.log("database connected......");
        });
    }
    catch (error) {
        console.log("database error");
    }
};
exports.dbConnect = dbConnect;

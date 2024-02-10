"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var conf_1 = require("./config/conf");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = process.env.Port || 3000;
dotenv_1.default.config();
(0, conf_1.dbConnect)();
app.use((0, cors_1.default)({
    origin: "http://localhost:4200",
    credentials: true
}));
var url_routes_1 = __importDefault(require("../src/routes/url.routes"));
app.use(express_1.default.json());
app.use('/api/url', url_routes_1.default);
app.listen(port, function () {
    console.log("running port ".concat(port));
});

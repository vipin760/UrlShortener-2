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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var url_model_1 = __importDefault(require("../model/url.model"));
var shortid_1 = __importDefault(require("shortid"));
var router = (0, express_1.Router)();
router.post('/', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, urlData, shortid, newUrlData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                url = req.body.url;
                return [4 /*yield*/, url_model_1.default.findOne({ redirectUrl: url })];
            case 1:
                urlData = _a.sent();
                if (!urlData) return [3 /*break*/, 2];
                res.status(200).send({ data: urlData, message: "successfully shortened url" });
                return [3 /*break*/, 4];
            case 2:
                shortid = shortid_1.default.generate();
                return [4 /*yield*/, url_model_1.default.create({
                        shortUrl: shortid,
                        redirectUrl: url
                    })];
            case 3:
                newUrlData = _a.sent();
                res.status(200).send({ data: newUrlData, message: "successfully shortened url" });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                res.status(500).send({ data: "", message: "internal server down" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); }));
router.get('/analytics', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var urlString, newUrl, path, shortid, urlData, urlAnalytics, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                urlString = req.query.id;
                newUrl = new URL(urlString);
                path = newUrl.pathname.split('/');
                shortid = path[path.length - 1];
                return [4 /*yield*/, url_model_1.default.findOne({ shortUrl: shortid })];
            case 1:
                urlData = _a.sent();
                if (urlData) {
                    urlAnalytics = {
                        totalClicks: urlData.visitHistory.length,
                        analytics: urlData.visitHistory
                    };
                    res.status(200).send({ data: urlAnalytics, message: "url anyalytics created successfully" });
                }
                else {
                    res.status(401).send({ data: "", message: "We cannot find the correspondence address you provided." });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).send({ data: "", message: "internal server down" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.get("/un-short", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uri, url, path, shortId_1, urlExist, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                uri = req.query.id;
                url = new URL(uri);
                path = url.pathname.split('/');
                shortId_1 = path[path.length - 1];
                return [4 /*yield*/, url_model_1.default.findOne({ shortUrl: shortId_1 })];
            case 1:
                urlExist = _a.sent();
                if (urlExist) {
                    console.log(urlExist.redirectUrl, "yup");
                    res.status(200).send({ data: urlExist.redirectUrl, message: "fetch unshorten url" });
                }
                else {
                    res.status(401).send({ data: '', message: "could not find in our collections" });
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).send({ data: "", message: "internal server down" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.get('/:id', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var urlData, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, url_model_1.default.findOneAndUpdate({ shortUrl: req.params.id }, { $push: {
                            visitHistory: {
                                timestamp: Date.now()
                            }
                        } })];
            case 1:
                urlData = _a.sent();
                if (urlData) {
                    res.status(200).send({ data: urlData.redirectUrl, message: "url fetch successfully" });
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).send({ data: "", message: "internal server down" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
// router.get("/un-short",asyncHandler ( async(req:Request,res:Response)=>{
//     try {
//         console.log("working");
//         const url = req.query.id;
//         console.log(url);
//         const urlExist = await UrlModel.findOne({shortUrl:url});
//         console.log(urlExist);
//         if(urlExist){
//             res.status(200).send({data:urlExist.redirectUrl,message:"fetch unshorten url"})
//         }else{
//             res.status(401).send({data:'',message:"could not find in our collections"})
//         }
//     } catch (error) {
//         res.status(500).send({data:"",message:"internal server down"})
//     }
// }))
exports.default = router;

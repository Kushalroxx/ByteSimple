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
exports.getAllBlogsController = void 0;
const schema_1 = require("../../db/schema");
const getAllBlogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = req.query.limit || "10";
    const page = req.query.page || "1";
    const skip = (parseInt(page) - 1) * parseInt(limit);
    try {
        const [blogs, count] = yield Promise.all([yield schema_1.Blog.find().skip(skip).limit(parseInt(limit)), yield schema_1.Blog.countDocuments()]);
        res.status(200).json({ message: "Get all blog successful", blogs, noOfBlogs: count });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllBlogsController = getAllBlogsController;

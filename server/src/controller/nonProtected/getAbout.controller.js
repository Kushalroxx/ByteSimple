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
exports.getAboutController = void 0;
const schema_1 = require("../../db/schema");
const getAboutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const about = yield schema_1.About.find();
        if (!about || about.length === 0) {
            res.status(404).json({ message: "About not found" });
            return;
        }
        res.status(200).json({ message: "Get about successful", about });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAboutController = getAboutController;

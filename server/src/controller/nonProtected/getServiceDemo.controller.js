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
exports.getServiceDemoController = void 0;
const schema_1 = require("../../db/schema");
const getServiceDemoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceDemo = yield schema_1.ServiceDemo.find();
        if (!serviceDemo || serviceDemo.length === 0) {
            res.status(404).json({ message: "Service demo not found" });
            return;
        }
        res.status(200).json({ message: "Get service demo successful", serviceDemo });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getServiceDemoController = getServiceDemoController;

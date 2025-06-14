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
exports.createContactController = void 0;
const schema_1 = require("../../db/schema");
const createContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, description } = req.body;
    if (!name || !email || !phone || !description) {
        res.status(400).json({ message: "All fields are required" });
    }
    const existedContact = yield schema_1.CustomerContact.findOne({ email });
    if (existedContact) {
        res.status(400).json({ message: "Contact already exists" });
    }
    try {
        yield schema_1.CustomerContact.create({ name, email, phone, description });
        res.status(200).json({ message: "Contact created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createContactController = createContactController;

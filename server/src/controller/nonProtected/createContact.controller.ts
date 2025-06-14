import { Request, Response } from "express";
import { contactinterface } from "../../lib/interface";
import { CustomerContact } from "../../db/schema";

export const createContactController = async(req:Request, res:Response) => {
    const {name, email, phone, description} = req.body as contactinterface;
    if (!name || !email || !phone || !description) {
        res.status(400).json({ message: "All fields are required"});
    }
    const existedContact = await CustomerContact.findOne({email});
    if (existedContact) {
        res.status(400).json({ message: "Contact already exists"});
    }
    try {
        await CustomerContact.create({name, email, phone, description});
        res.status(200).json({ message: "Contact created successfully"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
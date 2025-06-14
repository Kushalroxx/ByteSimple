import { Request, Response } from "express";
import { CustomerContact } from "../../db/schema";

export const getContactController = async(req:Request, res:Response) => {
    try {
        const contacts = await CustomerContact.find()
        if (!contacts || contacts.length === 0) {
            res.status(404).json({ message: "Contact not found"});
            return
        }
        res.status(200).json({ message: "Get contact successful", contacts});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }

}
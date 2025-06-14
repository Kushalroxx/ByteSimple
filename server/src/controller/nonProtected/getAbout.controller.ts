import { Request, Response } from "express";
import { About } from "../../db/schema";

export const getAboutController = async(req:Request, res:Response) => {
    try {
        const about = await About.find();
        
        if (!about || about.length === 0) {
            res.status(404).json({ message: "About not found"});
            return;
        }
        res.status(200).json({ message: "Get about successful", about});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
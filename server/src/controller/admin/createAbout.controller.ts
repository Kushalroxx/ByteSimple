import { Request, Response } from "express";
import { aboutinterface } from "../../lib/interface";
import { About } from "../../db/schema";

export const createAboutController = async(req:Request, res:Response) => {
    const {image, description} = req.body as aboutinterface
    if (!image || !description) {
        res.status(400).json({ message: "All fields are required"});
        return;
    }
    try {
        await About.create({image, description});
        res.status(200).json({ message: "Create about successful"});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
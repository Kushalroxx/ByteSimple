import { Request, Response } from "express";
import { aboutinterface } from "../../lib/interface";
import { About } from "../../db/schema";

export const updateAboutController = async(req:Request, res:Response) => {
    const id = req.query.id as string
    const {image, description} = req.body as aboutinterface
    try { 
        const updatedAbout = await About.findOneAndUpdate({_id:id},{image, description});
        if(!updatedAbout){
            res.status(404).json({ message: "About not found"});
            return; 
        }
        res.status(200).json({ message: "Update about successful"});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
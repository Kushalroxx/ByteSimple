import { Request, Response } from "express";
import { About } from "../../db/schema";

export const deleteAboutController = async(req:Request, res:Response) => {
    const id = req.query.id as string
    
    if (!id) {
        res.status(400).json({ message: "Please provide a valid id"});
        return;
    }
    try {
        const deletedAbout = await About.findByIdAndDelete({_id:id});   
        if(!deletedAbout){
            res.status(404).json({ message: "About not found"});
            return 
        }
        res.status(200).json({ message: "Delete about successful"});
        return;
    }catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
import { Request, Response } from "express";
import { Service } from "../../db/schema";

export const deleteServiceController = async(req:Request, res:Response) => {
    const id = req.query.id as string
    
    if (!id) {
        res.status(400).json({ message: "Please provide a valid id"});
        return;
    }
    try {
        const deletedService = await Service.findByIdAndDelete({_id:id});
        if(!deletedService){
            res.status(404).json({ message: "Service not found"});
            return;
        }
        res.status(200).json({ message: "Delete service successful"});
        return;
    }catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
import { Request, Response } from "express";
import { serviceInterface } from "../../lib/interface";
import { Service } from "../../db/schema";

export const updateServiceController = async(req:Request, res:Response) => {
    const id = req.query.id
    const {serviceName, description, image} = req.body as serviceInterface
    
    try {
        const updatedService = await Service.findOneAndUpdate({_id:id},{serviceName, description, image});
        if(!updatedService){
            res.status(404).json({ message: "Service not found"});
            return;
        }
        res.status(200).json({ message: "Update service successful"});
        return;
    }catch(error){
        res.status(500).json({ message: "Internal server error"});
    }
}
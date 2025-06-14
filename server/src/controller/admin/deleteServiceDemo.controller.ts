import { Request, Response } from "express";
import { ServiceDemo } from "../../db/schema";

export const deleteServiceDemoController = async(req:Request, res:Response) => {
    const id  = req.query.id as string
    if(!id) {
        res.status(400).json({ message: "Please provide a valid id"});
        return;
    }
    try {
        const deletedServiceDemo = await ServiceDemo.findByIdAndDelete({_id:id});
        if(!deletedServiceDemo){
            res.status(404).json({ message: "Service demo not found"});
            return;
        }
        res.status(200).json({ message: "Delete service demo successful"});
        return;
    }catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
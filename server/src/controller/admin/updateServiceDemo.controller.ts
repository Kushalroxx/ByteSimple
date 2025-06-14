import { Request, Response } from "express";
import { serviceDemoInterface } from "../../lib/interface";
import { ServiceDemo } from "../../db/schema";

export const updateServiceDemoController = async(req:Request, res:Response) => {
    const id = req.query.id
    const {video, demoName, description, link} = req.body as serviceDemoInterface
    
    try {
        const updatedServiceDemo = await ServiceDemo.findOneAndUpdate({_id:id},{video, demoName, description, link});
        if(!updatedServiceDemo){
            res.status(404).json({ message: "Service demo not found"});
            return;
        }
        res.status(200).json({ message: "Update service demo successful"});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
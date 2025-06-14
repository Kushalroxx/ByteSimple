import { Request, Response } from "express";
import { ServiceDemo } from "../../db/schema";

export const getServiceDemoController = async(req:Request, res:Response) => {
    try{
        const serviceDemo = await ServiceDemo.find();
        if (!serviceDemo|| serviceDemo.length === 0) {
            res.status(404).json({ message: "Service demo not found"});
            return;
        }
        res.status(200).json({ message: "Get service demo successful", serviceDemo});
        return;
    }catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
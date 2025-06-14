import { Request, Response } from "express";
import { serviceDemoInterface } from "../../lib/interface";
import { ServiceDemo } from "../../db/schema";

export const createServiceDemoController = async(req:Request, res:Response) => {
    const {video, demoName, description, link} = req.body as serviceDemoInterface
    if (!video || !demoName || !description) {
        res.status(400).json({ message: "All fields are required"});
        return;
    }
    try {
        const existedServiceDemo = await ServiceDemo.findOne({demoName});
        if (existedServiceDemo) {
            res.status(400).json({ message: "Service demo already exists"});
            return;
        }
        await ServiceDemo.create({video, demoName, description, link});
        res.status(200).json({ message: "Create service demo successful"});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
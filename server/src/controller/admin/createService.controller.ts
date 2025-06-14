import { Request, Response } from "express";
import { serviceInterface } from "../../lib/interface";
import { Service } from "../../db/schema";

export const CreateServiceController = async(req:Request, res:Response) => {
    const {serviceName, description, image} = req.body as serviceInterface
    if(!serviceName || !description || !image) {
        res.status(400).json({ message: "All fields are required"});
        return;
    }

    try {
        const existedService = await Service.findOne({serviceName});
        if(existedService) {
            res.status(400).json({ message: "Service already exists"});
            return;
        }
    
        await Service.create({serviceName, description, image});
        res.status(200).json({ message: "Create service successful"});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
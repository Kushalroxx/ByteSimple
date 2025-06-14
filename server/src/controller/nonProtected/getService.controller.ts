import { Request, Response } from "express";
import { Service } from "../../db/schema";

export const getServiceController = async(req:Request, res:Response) => {
    try {
        const services = await Service.find();
        if (!services || services.length === 0) {
            res.status(404).json({ message: "Service not found"});
            return;
        }
        res.status(200).json({ message: "Get service successful", services});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
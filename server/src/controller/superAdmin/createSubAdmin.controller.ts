import { Request, Response } from "express";

export const createSubAdminController = async(req:Request, res:Response) => {
    res.status(200).json({ message: "Create subAdmin successful"});
}
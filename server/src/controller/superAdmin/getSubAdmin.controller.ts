import { Request, Response } from "express";

export const getSubAdminController = async(req:Request, res:Response) => {
    res.status(200).json({ message: "Get subAdmin successful"});
}
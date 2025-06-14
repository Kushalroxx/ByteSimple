import { Request, Response } from "express";

export const deleteSubAdminController = async(req:Request, res:Response) => {
    res.status(200).json({ message: "Delete subAdmin successful"});
}
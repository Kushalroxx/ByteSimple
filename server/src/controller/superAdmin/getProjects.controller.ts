import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const getProjectsController = async(req:Request, res:Response) => {
    try {
        const projects = await ProjectRequest.find();
        if (!projects || projects.length === 0) {
            res.status(404).json({ message: "Projects not found"});
            return;
        }
        res.status(200).json({ message: "Get projects successful", projects});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}

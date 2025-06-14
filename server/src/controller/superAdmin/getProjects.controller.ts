import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const getProjectsController = async(req:Request, res:Response) => {
    const status = req.params.status as string;
    if(status!== 'pending' && status!== 'reviewed' && status!== 'quoted' && status!== 'client-countered' && status!== 'approved' && status!== 'in-progress' && status!== 'completed' && status!== 'cancelled') {
        res.status(400).json({ message: "Please provide a valid status"});
        return;
    }
    try {
        const projects = await ProjectRequest.find({status}).select("projectTitle status projectType paymentType _id urgency");
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
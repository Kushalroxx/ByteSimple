import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const getOneProjectController = async(req:Request, res:Response) => {
    const id = req.params.id as string
    if (!id) {
        res.status(400).json({ message: "Please provide a valid id"});
        return;
    }
    try {
        const project = await ProjectRequest.findById(id);
        if (!project) {
            res.status(404).json({ message: "Project not found"});
            return;
        }
        ProjectRequest.findByIdAndUpdate(id, {status: "reviewed"}, {new: true});
        res.status(200).json({ message: "Get one project successful"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        return
    }
}
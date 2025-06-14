import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const approveProjectController = async(req:Request, res:Response) => {
    const id = req.params.id as string
    const user = req.user as any
    if (!id) {
        res.status(400).json({ message: "Please provide a valid id"});
        return;
    }
    try {
        const project = await ProjectRequest.findOne({_id: id, clientId: user.id});
        if (!project) {
            res.status(404).json({ message: "Project not found"});
            return;
        }
        if (project.status === "approved") {
            res.status(400).json({ message: "Project already approved"});
            return
        }
        if (project.status === "final-countered") {
            const newProject = await ProjectRequest.findByIdAndUpdate(id, {status: "approved"}, {new: true});
            res.status(200).json({ message: "Approve project successful", project:newProject});
            return
        }
        res.status(400).json({ message: "Please wait for final quote or client quote"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        return
    }
}
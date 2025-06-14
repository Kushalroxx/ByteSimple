import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const finalQuoteController = async(req:Request, res:Response) => {
    const id = req.params.id as string
    const {finalQuote} = req.body
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
        if (project.finalQuote || project.status==="in-progress" || project.status==="completed" || project.status === "cancelled") {
            res.status(400).json({ message: "Final quote already submitted"});
            return
        }
        if (project.clientQuote && finalQuote===project.clientQuote) {
            const newProject = await ProjectRequest.findOneAndUpdate({_id: id}, {status: 'approved', finalQuote: finalQuote}, {new: true});
            res.status(200).json({ message: "Final quote successful", project: newProject});
            return
            
        }
        const newProject = await ProjectRequest.findByIdAndUpdate(id, {status: "final-countered", finalQuote: finalQuote}, {new: true});
        res.status(200).json({ message: "Final quote successful", project: newProject});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        return
    }
}
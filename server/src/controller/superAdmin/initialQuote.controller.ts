import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const initialQuoteController = async(req:Request, res:Response) => {
    const id = req.params.id as string
    const {initialQuote} = req.body
    if (!id) {
        res.status(400).json({ message: "Please provide a valid id"});
        return;
    }
    if (!initialQuote) {
        res.status(400).json({ message: "Please provide a valid quote"});
        return;
    }
    try {
        let project = await ProjectRequest.findById(id);
        if (!project) {
            res.status(404).json({ message: "Project not found"});
            return;
        }
        if (project.initialQuote || project.status!=='reviewed') {
            res.status(400).json({ message: "Initial quote already submitted"});
            return
        }
        project = await ProjectRequest.findByIdAndUpdate(id, {status: "quoted", initialQuote: initialQuote}, {new: true});
        res.status(200).json({ message: "Initial quote successful", project});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        return
    }
}

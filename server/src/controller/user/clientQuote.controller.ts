import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const clientQuoteController = async(req:Request, res:Response) => {
    const id = req.params.id as string
    const {clientQuote} = req.body
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
        if (!project.initialQuote) {
            res.status(400).json({ message: "Please wait for initial quote"});
            return
        }
        if (project.clientQuote || project.status!=='quoted') {
            res.status(400).json({ message: "Client quote already submitted"});
            return
        }
        if (project.initialQuote && clientQuote===project.initialQuote) {
            const newProject = await ProjectRequest.findOneAndUpdate({_id: id, clientId: user.id}, {status: 'approved', clientQuote: clientQuote, finalQuote: clientQuote}, {new: true});
            res.status(200).json({ message: "Client quote successful", project: newProject});
            return
        }
        const newProject = await ProjectRequest.findOneAndUpdate({_id: id, clientId: user.id}, {status: 'client-countered', clientQuote: clientQuote}, {new: true});
        res.status(200).json({ message: "Client quote successful", project: newProject});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        return
    }
}
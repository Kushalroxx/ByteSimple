import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const getProjectsUserController = async(req:Request, res:Response) => {
    const id = req.params.id as string
    const user = req.user as any
    if (!id) {
        try {
            const projects = await ProjectRequest.find({clientId:user.id}).select("projectTitle status projectType paymentType _id urgency");
            if (!projects || projects.length === 0) {
                res.status(404).json({ message: "Projects not found"});
                return;
            }
            res.status(200).json({ message: "Get projects successful", projects});
            return;
        } catch (error) {
            res.status(500).json({ message: "Internal server error"});
            return
        }
    }
   try {
     const project = await ProjectRequest.find({_id: id, clientId:user.id})
     if (!project || project.length === 0) {
         res.status(404).json({ message: "Projects not found"});
         return;
     }
     res.status(200).json({ message: "Get projects successful", project});
     return
   } catch (error) {
    res.status(500).json({ message: "Internal server error"});
    return
   }
}
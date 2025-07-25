import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const getProjectsUserController = async(req:Request, res:Response) => {
    const id = req.params.id as string
    const user = req.user as any
    if (!id) {
        try {
            const projects = await ProjectRequest.find({clientId:user.id});
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
     const project = await ProjectRequest.findOne({_id: id, clientId:user.id})
     if (!project) {
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

import { Request, Response } from "express";
import { ProjectRequest } from "../../db/schema";

export const createProjectController = async(req:Request, res:Response) => {
    const user = req.user as any;
    const { projectTitle, projectDescription, designPreference, projectType, projectLink, minBudget, maxBudget, urgency, techPreference, paymentType } = req.body;
    console.log(projectTitle,projectDescription,projectType,minBudget,maxBudget,designPreference)
    if (!projectTitle || !projectDescription || !projectType || !minBudget ||!maxBudget ||!designPreference) {
        res.status(400).json({ message: "All fields are required"});
        return
    }
    try {
        const existedProject = await ProjectRequest.findOne({clientId: user.id, projectTitle});
        if (existedProject) {
            res.status(400).json({ message: "Project already exists"});
            return
        }
        const budget = {min:minBudget, max:maxBudget};
        const project = await ProjectRequest.create({clientId: user.id, projectTitle, projectDescription, designPreference, projectType, projectLink, budget, urgency, techPreference, paymentType, user});
        res.status(200).json({ message: "Create project successful", project});
        return
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        return
    }
}

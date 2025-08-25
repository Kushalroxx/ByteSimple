import { Request, Response } from "express";
import { ProjectRequest, User } from "../../db/schema";

export const adminCreateProjectController = async(req:Request, res:Response) => {
    const { projectTitle, projectDescription, designPreference, projectType, projectLink, minBudget, maxBudget, urgency, techPreference, paymentType, userEmail } = req.body;
    console.log(projectTitle,projectDescription,projectType,minBudget,maxBudget,designPreference)
    if (!projectTitle || !projectDescription || !projectType || !minBudget ||!maxBudget ||!designPreference) {
        res.status(400).json({ message: "All fields are required"});
        return
    }
    try {
        const user = await User.findOne({email:userEmail})
        if (!user) {
            res.status(400).json({ message: "User not found"});
            return
        }
        const existedProject = await ProjectRequest.findOne({clientId: user._id, projectTitle});
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
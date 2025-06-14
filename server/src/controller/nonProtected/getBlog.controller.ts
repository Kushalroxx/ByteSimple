import { Request, Response } from "express";
import { Blog } from "../../db/schema";

export const getBlogController = async(req:Request, res:Response) => {
    const slug = req.params.slug as string;
    if (!slug) {
        res.status(400).json({ message: "Please provide a valid slug"});
        return;
    }
    try {
        const blog = await Blog.findOne({slug});
        if (!blog) {
            res.status(404).json({ message: "Blog not found"});
            return;
        }
        res.status(200).json({ message: "Get blog successful", blog});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
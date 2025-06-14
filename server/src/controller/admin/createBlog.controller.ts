import { Request, Response } from "express";
import { bloginterface } from "../../lib/interface";
import { Blog } from "../../db/schema";

export const createBlogController = async(req:Request, res:Response) => {
    const {blogName, description,links} = req.body as bloginterface
    if (!blogName || !description) {
        res.status(400).json({ message: "All fields are required"});
        return;
    }
    const slug = blogName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    try {
        const existedBlog = await Blog.findOne({slug:slug});
        if (existedBlog) {
            res.status(400).json({ message: "Blog already exists"});
            return;
        }
        await Blog.create({blogName, description,links,slug});
        res.status(200).json({ message: "Create blog successful"});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
import { Request, Response } from "express";
import { bloginterface } from "../../lib/interface";
import { Blog } from "../../db/schema";

export const updateBlogController = async(req:Request, res:Response) => {
    const id = req.query.id
    const {blogName,description,links} = req.body as bloginterface
    try {
        const slug = blogName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const updatedBlog = await Blog.findOneAndUpdate({_id:id},{blogName,description,links,slug});
        if(!updatedBlog){
            res.status(404).json({ message: "Blog not found"});
            return;
        }
        res.status(200).json({ message: "Edit blog successful"});
    } catch (error) {
     res.status(500).json({ message: "Internal server error"});
    }
}
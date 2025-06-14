import { Request, Response } from "express";
import { Blog } from "../../db/schema";

export const deleteBlogController = async(req:Request, res:Response) => {
    const id = req.query.id as string
    try {
        const deletedBlog = await Blog.findByIdAndDelete({_id:id});
        if(!deletedBlog){
            res.status(404).json({ message: "Blog not found"}); 
        }
        res.status(200).json({ message: "Delete blog successful"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
import { Request, Response } from "express";
import { Blog } from "../../db/schema";

export const getAllBlogsController = async(req:Request, res:Response) => {
    const limit = req.query.limit as string || "10";    
    const page = req.query.page as string || "1";
    const skip = (parseInt(page) - 1) * parseInt(limit);    
    try {
        const [blogs, count] = await Promise.all([await Blog.find().skip(skip).limit(parseInt(limit)),await Blog.countDocuments()]);
        res.status(200).json({ message: "Get all blog successful", blogs,noOfBlogs:count});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
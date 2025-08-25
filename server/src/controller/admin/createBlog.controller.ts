import { Request, Response } from "express";
import { bloginterface } from "../../lib/interface";
import { Blog, BlogCategory } from "../../db/schema";

export const createBlogController = async(req:Request, res:Response) => {
    const {blogName, description,links,category,subCategory,tags} = req.body as bloginterface
    if (!blogName || !description || !category || !subCategory || !tags) {
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

        let blogCategory = await BlogCategory.findOne({category:category.trim().toLowerCase()});
        let blogSubCategory = await BlogCategory.findOne({category:subCategory.trim().toLowerCase()});
        if (!blogCategory) {
            blogCategory = await BlogCategory.create({category:category.trim().toLowerCase()});
        }
        if (!blogSubCategory) {
            blogSubCategory = await BlogCategory.create({category:subCategory.trim().toLowerCase()});
        }
        await Blog.create({blogName, description,links,slug,category:blogCategory._id,subCategory:blogSubCategory._id,tags});
        res.status(200).json({ message: "Create blog successful"});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
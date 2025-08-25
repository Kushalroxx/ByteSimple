import { Request, Response } from "express";
import { BlogCategory } from "../../db/schema";

export const getCategoriesController = async(req:Request, res:Response) => {
    try {
        const categories = await BlogCategory.find();
        if (!categories || categories.length === 0) {
            res.status(404).json({ message: "Category not found"});
            return;
        }
        res.status(200).json({ message: "Get category successful", categories});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
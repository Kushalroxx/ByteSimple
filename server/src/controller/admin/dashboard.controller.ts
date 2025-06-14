import { Request, Response } from "express";
import { Blog, CustomerContact, Service, ServiceDemo } from "../../db/schema";

export const dashboardController = async(req:Request, res:Response) => {
    try {
        const [noOfContact, noOfBlogs, noOfServices, noOfServicesDemo] = await Promise.all([CustomerContact.countDocuments(),Blog.countDocuments(),Service.countDocuments(), ServiceDemo.countDocuments()])
        res.status(200).json({ message: "Dashboard successful", data:[{noOfContact}, {noOfBlogs}, {noOfServices}, {noOfServicesDemo}]});
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        return;
    }
}
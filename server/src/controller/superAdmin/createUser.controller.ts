import { Request, Response } from "express";
import { User } from "../../db/schema";
import bcrypt from "bcrypt"

export const createUserController = async(req:Request, res:Response) => {
    const {email, password, type="user"} = req.body as {email:string, password:string, type:string};
    if (type !== "admin" && type !== "subAdmin" && type !== "user") {
        res.status(400).json({ message: "Invalid type"});
        return
        
    }
    if (!email || !password) {
        res.status(400).json({ message: "All fields are required"});
    }
    try {
        const existedUser = await User.findOne({email});
        if(existedUser){
            res.status(400).json({ message: "User already exists"});
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({email, password:hashedPassword, type});
        res.status(200).json({ message: "User created successfully"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
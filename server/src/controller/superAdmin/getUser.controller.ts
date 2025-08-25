import { Request, Response } from "express";
import { User } from "../../db/schema";

export const getUserController = async(req:Request, res:Response) => {
    const {userEmail} = req.body as {userEmail:string};
    try {
        const user = await User.findOne({email:userEmail});
        if(!user){
            res.status(400).json({ message: "User not found"});
            return
        }
        res.status(200).json({user, message: "User found successfully"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}

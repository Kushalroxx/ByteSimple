import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../../db/schema";
import jwt from "jsonwebtoken";
import mailer from "../../lib/sendMail";

const emailSchema = z.object({
    email: z.string().email({ message: "Invalid email address"}),
})
export const forgotPasswordController = async(req:Request, res:Response) => {
    const email = req.body.email;
    const result = emailSchema.safeParse({email});
    if (result.error) {
        res.status(400).json(result.error.errors);
        return;
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({ message: "User not found"});
            return
        }
        const token = jwt.sign({
            email:user.email,
            id:crypto.randomUUID()
        }, process.env.PASSWORD_SECRET||"", {
            expiresIn:"15m"
        })
        const result = await mailer.sendPasswordMail(email, token)
        if (result) {
            res.status(200).json({ message: "Otp Send to your email"});
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
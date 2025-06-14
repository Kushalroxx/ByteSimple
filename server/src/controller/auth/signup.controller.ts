import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../../db/schema";
import { GenerateOTP } from "../../lib/generateOTP";
import otpStore from "../../lib/otpStore";
import mailer from "../../lib/sendMail";

const schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address"}),
    password: z.string().min(8,{message:"Password must be at least 8 characters long" }).max(20,{message:"Password must be at most 32 characters long"}),
})
export const signupController = async(req:Request, res:Response) => {
    const {name, email, password} = req.body;
    const result = schema.safeParse({name, email, password});
    if(result.error){
        res.status(400).json(result.error.errors);
        return;
    }
    try {
        const existedUser = await User.findOne({email});
        if(existedUser){
            res.status(400).json({ message: "User already exists"});
            return
        }
        const otp = GenerateOTP()
        otpStore.addOtp(email, otp)
        const data = await mailer.sendOtp(email, otp)
        if (!data) {
            res.status(500).json({ message: "Internal server error"});
        }
        res.status(200).json({ message: "Otp Send to your email"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
}
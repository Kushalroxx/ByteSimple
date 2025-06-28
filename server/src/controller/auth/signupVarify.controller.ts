import { Request, Response } from "express";
import otpStore from "../../lib/otpStore";
import { User } from "../../db/schema";
import { generateJWT } from "../../lib/generateJWT";
import bcrypt from "bcrypt"

export const signupVerifyController = async(req: Request, res: Response) => {
    const { email, otp, password, name } = req.body;
    if (!email || !otp) {
        res.status(400).json({ message: "All fields are required"});
        return
    }
    const serverOtp = otpStore.getOtp(email);
    if (!serverOtp) {
        res.status(400).json({ message: "otp expired"});
        return
    }
    if (serverOtp !== otp) {
        res.status(400).json({ message: "Invalid otp"});
        return
    }
    
    try {
        const existedUser = await User.findOne({email});
        if(existedUser){
            res.status(400).json({ message: "User already exists"});
            return
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password:hashedPassword, type: "user"});
        const accessToken = generateJWT("access", {id: user.id, email: user.email, type: user.type});
        const refreshToken = generateJWT("refresh", {id: user.id, email: user.email, type: user.type});
        res.cookie("refreshToken",refreshToken,{httpOnly: true,sameSite: "lax",secure:process.env.NODE_ENV === "production"});
        res.cookie("accessToken",accessToken,{httpOnly: true,sameSite: "lax",secure:process.env.NODE_ENV === "production"});
        res.status(200).json({ message: "Signup successful", user:{name:user.name, email:user.email, type:user.type}});
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error"});
        return
    }
    }

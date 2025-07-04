import { Request, Response } from "express";
import { z } from "zod";
import { generateJWT } from "../../lib/generateJWT";
import dotenv from "dotenv";
import { User } from "../../db/schema";
import bcrypt from "bcrypt"

dotenv.config();

const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email address"}),
    password: z.string().min(8,{message:"Password must be at least 8 characters long" }).max(20,{message:"Password must be at most 32 characters long"}),
})

export const signinController = async(req:Request, res:Response) => {
    
    const { email, password } = req.body;
    const result = signinSchema.safeParse({ email, password });
    if (result.error) {
        res.status(400).json(result.error.errors);
        return; 
    }
    //   superAdmin login
    if (email === process.env.ADMIN_USER_EMAIL && password === process.env.ADMIN_USER_PASSWORD) {
        const accessToken = generateJWT("access", {id: "1", email: email, type: "admin"});
        const refreshToken = generateJWT("refresh", {id: "1", email: email, type: "admin"} );
        
        res.cookie("refreshToken",refreshToken,{httpOnly: true,sameSite: "lax",secure:process.env.NODE_ENV === "production"});
        res.cookie("accessToken",accessToken,{httpOnly: true,sameSite: "lax",secure:process.env.NODE_ENV === "production"});    
        res.status(200).json({ message: "Login successful",user:{email:email,type:"admin"}});
        return
    }
// user or subAdmin login
    try {
        const user = await User.findOne({email: email});
              
        if(!user){
            res.status(404).json({ message: "Invalid password or email"});
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password||"");    
        if(!isPasswordCorrect){
            res.status(401).json({ message: "Invalid password or email"});
            return
        }
        const accessToken = generateJWT("access", {id: user.id, email: user.email, type: user.type});
        const refreshToken = generateJWT("refresh", {id: user.id, email: user.email, type: user.type});
    
        res.cookie("refreshToken",refreshToken,{httpOnly: true,sameSite: "lax",secure:process.env.NODE_ENV === "production"});
        res.cookie("accessToken",accessToken,{httpOnly: true,sameSite: "lax",secure:process.env.NODE_ENV === "production"});    
        res.status(200).json({ message: "Login successful", user:{email:user.email,type:user.type}});
        return
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        return
    }

};

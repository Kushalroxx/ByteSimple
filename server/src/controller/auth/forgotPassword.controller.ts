import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../../db/schema";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import mailer from "../../lib/sendMail";
import bcrypt from "bcrypt"

const emailSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})
const passwordSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(20, { message: "Password must be at most 32 characters long" }),
})
export const forgotPasswordController = async (req: Request, res: Response) => {
    const token = req.query.token
    const email = req.body.email;
    const password = req.body.password;
    if (token && password) {
        try {
            const result = passwordSchema.safeParse({ password });
            if (result.error) {
                res.status(400).json(result.error.errors);
                return 
            }

            const decoded = jwt.verify(token as string, process.env.PASSWORD_SECRET || "") as { email: string, id: string };
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.findOneAndUpdate({ 
                email: decoded.email 
            },{ 
                password: hashedPassword 
            });

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return
            }

            res.status(200).json({ message: "Password updated successfully" });
            return
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                res.status(400).json({ message: "Token expired" });
                return
            }
            res.status(500).json({ message: "Something went wrong" });
            return
        }
    }
    const result = emailSchema.safeParse({ email });
    if (result.error) {
        res.status(400).json(result.error.errors);
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return
        }
        if (!user.password) {
            res.status(404).json({ message: "Oops! It seems your account isn't set up with a password. Try signing in using another method — for example, Google Login." });
            return
        }
        const token = jwt.sign({
            email: user.email,
            id: crypto.randomUUID()
        }, process.env.PASSWORD_SECRET || "", {
            expiresIn: "15m"
        })
        const result = await mailer.sendPasswordMail(email, token)
        if (result) {
            res.status(200).json({ message: "Otp Send to your email" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
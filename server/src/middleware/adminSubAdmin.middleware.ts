import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { generateJWT } from "../lib/generateJWT";

export const adminSubAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accesstoken = req.cookies.accessToken;
    const refreshtoken = req.cookies.refreshToken;
    
    if (!accesstoken || !refreshtoken) {
        
        res.status(401).json({ message: "Unauthorized" });
        return
    }
    try {
        const user = Jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET") as any;
        console.log(user);
        
        if (user.type === "admin"||user.type === "subAdmin") {
            req.user = user;
            next();
            return;
        }
        res.status(401).json({ message: "Unauthorized" });
        return
    } catch (error) {
        try {
            
            const user = Jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET") as any;
            if (user.type === "admin"||user.type === "subAdmin") {
                const accessToken = generateJWT("access", { id: user.id, email: user.email, type: "admin" });
                const refreshToken = generateJWT("refresh", { id: user.id, email: user.email, type: "admin" });
                res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
                res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
                req.user = user;
                next();
                return;
            }
            res.status(401).json({ message: "Unauthorized" });
            return
        } catch (error) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.status(401).json({ message: "Unauthorized" });
            return
        }
    }

}
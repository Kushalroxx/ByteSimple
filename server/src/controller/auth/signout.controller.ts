import { Request, Response } from "express";

export const signoutController = (req:Request, res:Response) => {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logout successful"});
}
import jwt from "jsonwebtoken"
import { userinterface } from "./interface"

export const generateJWT = (tokenType: string, user:userinterface) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        type: user.type,
        tokenType: tokenType,
        tokenId: crypto.randomUUID()
    },
    tokenType === "access" ? process.env.ACCESS_TOKEN_SECRET||"" : process.env.REFRESH_TOKEN_SECRET||"", 
    {
        expiresIn: tokenType === "access" ? "1d" : "7d"
    });

    return token
}
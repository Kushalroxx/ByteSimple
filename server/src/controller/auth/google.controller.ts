import { Request, Response } from "express";
import { User } from "../../db/schema";
import GoogleStrategy from "passport-google-oauth20";
import jwt from "jsonwebtoken"
import { generateJWT } from "../../lib/generateJWT";
import { log } from "util";

export const googleController = async(req:Request, res:Response) => {
    const profile = req.user as GoogleStrategy.Profile
    try {
        let existedUser = await User.findOne({email: profile._json.email});
        if (!existedUser) {
            existedUser = await User.create({name: profile._json.name, email: profile._json.email, type: "user"});
        }
        if (existedUser.password) {
            res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Already Linked</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  height: 100vh;
  background: linear-gradient(135deg, #1c1c1c, #2e2e2e);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
">

  <div style="
    text-align: center;
    max-width: 600px;
    padding: 30px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  ">
    <h1 style="font-size: 1.8rem; margin-bottom: 20px;">
      The email <span style="color: #4fc3f7;">${profile._json.email}</span> is already linked to a password account.
    </h1>
    <p style="margin-bottom: 30px; font-size: 1rem; color: #ccc;">
      Please log in using your password credentials.
    </p>
    <a href="${process.env.CLIENT_URL1}/signin" style="
      background-color: #4fc3f7;
      color: #000;
      padding: 12px 28px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      transition: background 0.3s;
      display: inline-block;
    " onmouseover="this.style.backgroundColor='#29b6f6'" onmouseout="this.style.backgroundColor='#4fc3f7'">
      Login Now
    </a>
  </div>

</body>
</html>
`)
        }
               
        const accessToken = generateJWT("access", {id: existedUser.id, email: existedUser.email, type: existedUser.type} );
        const refreshToken = generateJWT("refresh", {id: existedUser.id, email: existedUser.email, type: existedUser.type} );
        res.redirect(`${process.env.CLIENT_URL1}/api/oauth-success?accessToken=${accessToken}&refreshToken=${refreshToken}`);
        return
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
}

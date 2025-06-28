import { Request, Response } from "express";
import { User } from "../../db/schema";
import GoogleStrategy from "passport-google-oauth20";
import { generateJWT } from "../../lib/generateJWT";

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
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      background: linear-gradient(135deg, #0f0f0f, #1e1e1e);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      text-align: center;
      max-width: 540px;
      padding: 40px 30px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.04);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(10px);
    }

    h1 {
      font-size: 1.9rem;
      margin-bottom: 18px;
      line-height: 1.4;
    }

    .email {
      color: #4fc3f7;
      word-break: break-all;
    }

    p {
      font-size: 1rem;
      color: #ccc;
      margin-bottom: 28px;
    }

    .btn {
      background-color: #4fc3f7;
      color: #000;
      padding: 12px 26px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: background-color 0.25s ease;
      display: inline-block;
    }

    .btn:hover {
      background-color: #29b6f6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>
      The email <span class="email">${profile._json.email}</span><br />
      is already linked to a password account.
    </h1>
    <p>Please log in using your password credentials.</p>
    <a href="${process.env.CLIENT_URL1}" class="btn">Login Now</a>
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

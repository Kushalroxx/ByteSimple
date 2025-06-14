import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASS,
    },
})
class Mailer {
    constructor() {
    }
    sendOtp(email: string, otp: string):Promise<boolean> {
        const mailOptions:MailOptions = {
            from: '"ByteSimple" <process.env.APP_EMAIL>',
            to: email,
            subject:"Your One-Time Password (OTP)",
            html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>OTP Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f9fc;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo img {
        max-height: 50px;
      }
      .heading {
        text-align: center;
        font-size: 22px;
        color: #333;
        margin-bottom: 16px;
      }
      .otp-box {
        font-size: 30px;
        text-align: center;
        background-color: #f1f1f1;
        padding: 15px;
        letter-spacing: 10px;
        font-weight: bold;
        border-radius: 6px;
        margin: 20px 0;
        color: #111;
      }
      .text {
        text-align: center;
        font-size: 16px;
        color: #555;
        margin-bottom: 20px;
      }
      .footer {
        text-align: center;
        font-size: 13px;
        color: #999;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <!-- Optional logo -->
        <img src="https://yourdomain.com/logo.png" alt="ByteSimple" />
      </div>
      <div class="heading">Your One-Time Password (OTP)</div>
      <div class="otp-box">${otp}</div>
      <div class="text">Use this OTP to complete your login. The code is valid for 5 minutes.</div>
      <div class="text">If you did not request this, please ignore this email.</div>
      <div class="footer">
        &copy; 2025 ByteSimple. All rights reserved.
      </div>
    </div>
  </body>
</html>
`,
        };
         const data = transporter.sendMail(mailOptions).then(() => true).catch(() => false);
        return data
    }
}
const mailer = new Mailer()
export default mailer
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import authRouter from "./routes/auth/auth.router";
import { adminMiddleware } from "./middleware/admin.middleware";
import superAdminRouter from "./routes/superAdmin/superAdmin.router";
import { adminSubAdminMiddleware } from "./middleware/adminSubAdmin.middleware";
import adminRouter from "./routes/admin/admin.router";
import nonProtectedRouter from "./routes/nonProtected/nonProtected.router";
import { swaggerSpec } from "./lib/swagger";
import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import { User } from "./db/schema";
import { userMiddleware } from "./middleware/user.middlewere";
import userRouter from "./routes/user/user.router";
import jwt from "jsonwebtoken"

const app = express();
const normalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 70, 
    standardHeaders: true, 
    legacyHeaders: false
})
const highLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, 
    standardHeaders: true, 
    legacyHeaders: false
})
const allowedOrigins = [process.env.CLIENT_URL1, process.env.CLIENT_URL2];
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  }));
 
app.use(passport.initialize())
passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID||"",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET||"",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(normalLimiter)
app.disable('x-powered-by');

//api docs middlewere
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// routers

app.use("/auth", authRouter);
// this router's controller is not written yet

app.use("/super-admin", adminMiddleware, superAdminRouter)

app.use("/admin",adminSubAdminMiddleware, adminRouter)

app.use("/user",userMiddleware, userRouter)

app.get("/check", (req, res) => {
   const { accessToken, refreshToken } = req.cookies;
   
   try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET ||"") as any;
    
    res.status(200).json({user:{email:decodedAccessToken.email, name: decodedAccessToken.name, type:decodedAccessToken.type}});
  } catch (error) {
     try {
      const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET||"")as any
     res.status(200).json({user:{email:decodedRefreshToken.email, name:decodedRefreshToken.name, type:decodedRefreshToken.type}});
     } catch (error) {
      res.status(401).json({ message: "Unauthorized"});
     }
   }
});

app.use("/",nonProtectedRouter)


export default app;

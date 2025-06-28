import { Router } from "express";
import { signinController } from "../../controller/auth/signin.controller";
import { signoutController } from "../../controller/auth/signout.controller";
import passport from "passport";
import { generateJWT } from "../../lib/generateJWT";
import { signupController } from "../../controller/auth/signup.controller";
import { signupVerifyController } from "../../controller/auth/signupVarify.controller";
import { googleController } from "../../controller/auth/google.controller";
import { forgotPasswordController } from "../../controller/auth/forgotPassword.controller";

const authRouter = Router();

authRouter.route("/signup").post(signupController);
authRouter.route("/signup/verify").post(signupVerifyController);
authRouter.route("/forgot-password").post(forgotPasswordController);
authRouter.route("/signin").post(signinController);
authRouter.route("/signout").get(signoutController);
authRouter.route("/google").get(passport.authenticate("google", { scope: ["email", "profile"] }));
authRouter.route("/google/callback").get(passport.authenticate("google", { session: false,failureRedirect: "/" }), googleController)
export default authRouter;
import { Router } from "express";
import { createProjectController } from "../../controller/user/createProject.controller";
import { getProjectsUserController } from "../../controller/user/getProjectsUser.controller";
import { clientQuoteController } from "../../controller/user/clientQuote.controller";
import { approveProjectController } from "../../controller/user/approve.controller";

const userRouter = Router();

userRouter.route("/create-project").post(createProjectController);
userRouter.route("/projects/:id?").get(getProjectsUserController);
userRouter.route("/client-quote/:id").post(clientQuoteController);
userRouter.route("/approve-project/:id").post(approveProjectController);
userRouter.route("/delete-project").delete();

export default userRouter
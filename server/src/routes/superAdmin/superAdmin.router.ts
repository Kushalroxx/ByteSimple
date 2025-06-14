import { Router } from "express";
import { getSubAdminController } from "../../controller/superAdmin/getSubAdmin.controller";
import { createSubAdminController } from "../../controller/superAdmin/createSubAdmin.controller";
import { deleteSubAdminController } from "../../controller/superAdmin/deleteSubAdmin.controller";
import { getProjectsController } from "../../controller/superAdmin/getProjects.controller";
import { getOneProjectController } from "../../controller/superAdmin/get0neProject.controller";
import { initialQuoteController } from "../../controller/superAdmin/initialQuote.controller";
import { finalQuoteController } from "../../controller/superAdmin/finalQuote.controller";
import { cancelProjectController } from "../../controller/superAdmin/cancelProject.controller";

const superAdminRouter = Router();

superAdminRouter.route("/projects/:status").get(getProjectsController);
superAdminRouter.route("/project/:id").get(getOneProjectController);
superAdminRouter.route("/quote/:id").post(initialQuoteController)
superAdminRouter.route("/final-quote/:id").post(finalQuoteController)
superAdminRouter.route("/cancel-project/:id").post(cancelProjectController);
// superAdminRouter.route("/").get(getSubAdminController);
// superAdminRouter.route("/").post(createSubAdminController);
// superAdminRouter.route("/").delete(deleteSubAdminController);

export default superAdminRouter;
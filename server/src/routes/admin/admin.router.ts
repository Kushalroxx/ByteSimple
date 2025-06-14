import { Router } from "express";
import { dashboardController } from "../../controller/admin/dashboard.controller";
import { getContactController } from "../../controller/admin/getContact.controller";
import { createBlogController } from "../../controller/admin/createBlog.controller";
import upload from "../../lib/upload";
import { updateBlogController } from "../../controller/admin/updateBlog.controller";
import { deleteBlogController } from "../../controller/admin/deleteBlog.controller";
import { createAboutController } from "../../controller/admin/createAbout.controller";
import { updateAboutController } from "../../controller/admin/updateAbout.controller";
import { deleteAboutController } from "../../controller/admin/deleteAbout.controller";
import { createServiceDemoController } from "../../controller/admin/createServiceDemo.controller";
import { updateServiceDemoController } from "../../controller/admin/updateServiceDemo.controller";
import { deleteServiceDemoController } from "../../controller/admin/deleteServiceDemo.controller";
import { CreateServiceController } from "../../controller/admin/createService.controller";
import { updateServiceController } from "../../controller/admin/updateService.controller";
import { deleteServiceController } from "../../controller/admin/deleteService.controller";

const adminRouter = Router();

adminRouter.route("/dashboard").get(dashboardController)

adminRouter.route("/contacts").get(getContactController)

adminRouter.route("/blogs").post(createBlogController)
adminRouter.route("/blogs").put(updateBlogController)
adminRouter.route("/blogs").delete(deleteBlogController)

adminRouter.route("/about").post(createAboutController)
adminRouter.route("/about").put(updateAboutController)
adminRouter.route("/about").delete(deleteAboutController)

adminRouter.route("/service-demo").post(createServiceDemoController)
adminRouter.route("/service-demo").put(updateServiceDemoController)
adminRouter.route("/service-demo").delete(deleteServiceDemoController)

adminRouter.route("/service").post(CreateServiceController)
adminRouter.route("/service").put(updateServiceController)
adminRouter.route("/service").delete(deleteServiceController)

export default adminRouter
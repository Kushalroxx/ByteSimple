import { Router } from "express"
import { createContactController } from "../../controller/nonProtected/createContact.controller"
import { getAllBlogsController } from "../../controller/nonProtected/getAllBlogs.controller"
import { getBlogController } from "../../controller/nonProtected/getBlog.controller"
import { getAboutController } from "../../controller/nonProtected/getAbout.controller"
import { getServiceDemoController } from "../../controller/nonProtected/getServiceDemo.controller"
import { getServiceController } from "../../controller/nonProtected/getService.controller"

const nonProtectedRouter = Router()

nonProtectedRouter.route("/contacts").post(createContactController)

nonProtectedRouter.route("/blogs").get(getAllBlogsController)
nonProtectedRouter.route("/blog/:slug").get(getBlogController)

nonProtectedRouter.route("/about").get(getAboutController)

nonProtectedRouter.route("/service-demo").get(getServiceDemoController)

nonProtectedRouter.route("/service").get(getServiceController)

export default nonProtectedRouter
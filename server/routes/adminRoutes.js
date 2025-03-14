import e from "express";
import { checkAdminExists, createAdmin, loginAsAdmin } from "../controllers/admin.controller.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware.js";

const adminRouter = e.Router()

// adminSetup routes
adminRouter.get('/setup/check-admin', checkAdminExists)
adminRouter.post('/setup/create-admin', createAdmin)
adminRouter.post('/login', loginAsAdmin)

// admin working routes

adminRouter.route('/coupons', authAdminMiddleware).get().post()

adminRouter.post("/coupons/generate", authAdminMiddleware)

adminRouter.route("/coupons/:id", authAdminMiddleware).put().delete()

export { adminRouter }
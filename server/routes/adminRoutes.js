import e from "express";
import {
  checkAdminExists,
  createAdmin,
  createNewCoupon,
  deleteCoupon,
  getAllCoupons,
  getClaimLogs,
  loginAsAdmin,
  updateCoupon,
} from "../controllers/admin.controller.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware.js";

const adminRouter = e.Router();

// adminSetup routes
adminRouter.get("/setup/check-admin", checkAdminExists);
adminRouter.post("/setup/create-admin", createAdmin);
adminRouter.post("/login", loginAsAdmin);

// admin working routes
adminRouter
  .route("/coupons", authAdminMiddleware)
  .get(getAllCoupons)
  .post(createNewCoupon);
adminRouter.route("/coupons/:id", authAdminMiddleware).put(updateCoupon).delete(deleteCoupon);

adminRouter.get("/claims", getClaimLogs)

export { adminRouter };

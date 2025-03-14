import e from "express";
import { claimCoupon } from "../controllers/claim.controller.js";
import { claimLimiter } from "../middlewares/rateLimiter.middleware.js";

const couponRouter = e.Router()

couponRouter.get("/claim", claimLimiter, claimCoupon)

export { couponRouter }
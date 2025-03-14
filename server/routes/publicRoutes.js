import e from "express";
import { claimCoupon } from "../controllers/claim.controller.js";

const couponRouter = e.Router()

couponRouter.get("/claim", claimCoupon)

export { couponRouter }
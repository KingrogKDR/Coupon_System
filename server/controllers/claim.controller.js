import { ClaimLog } from "../models/claimLog.model.js";
import { Coupon } from "../models/coupon.model.js";

const claimCoupon = async (req, res) => {
    try {
        const ip = req.ip
        const browserFingerprint = req.cookies.browserFingerPrint || 'unknown';

        const coupon  = await Coupon.findOne({
            isActive: true,
            expiryDate: {$gt : new Date()},
            isAssigned: false,
        }).sort({ createdAt: 1})

        if(!coupon) {
            return res.status(404).json({ message: "No coupons available at the moment! Please try again later"})
        }

        coupon.isAssigned = true
        coupon.assignedTo = {
            ip,
            browserFingerprint,
            timestamp: new Date(),
        }

        await coupon.save();

        await ClaimLog.create({
            ip, 
            browserFingerprint,
            couponId: coupon._id,
            couponCode: coupon.code
        })

        res.json({
            code: coupon.code,
            description: coupon.description,
            discountAmount: coupon.discountAmount,
            expiry: coupon.expiryDate
        })

    } catch (error) {
        console.error(`Claiming coupon FAILED: ${error}`)
    }
}

export { claimCoupon }
import rateLimit from "express-rate-limit";
import { ClaimLog } from "../models/claimLog.model.js";

const apiLimiter = rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP. Please try again later."
})

const claimLimiter = async (req, res, next) => {
    try {
        const ip = req.ip
        const browserFingerPrint = req.cookies.browserFingerPrint || 'unknown'

        const coolDownPeriod = process.env.CLAIM_COOLDOWN_PERIOD || 24;
        const coolDownDate = new Date(Date.now() - (coolDownPeriod*60*60*1000))

        const recentClaim = await ClaimLog.findOne({
            $or: [
                { ip : ip},
                { browserFingerprint: browserFingerPrint}
            ],
            timestamp: { $gte : coolDownDate}
        })

        if(recentClaim){
            const timeElapsed = Date.now() - new Date(recentClaim.timestamp).getTime()
            const timeRemaining = (coolDownPeriod*60*60*1000) - timeElapsed;
            const hoursRemaining = Math.ceil(timeRemaining/(60*60*1000));

            return res.status(429).json({
                message: `You've already claimed a coupon recently. Please try again in ${hoursRemaining} hours.`,
                coolDownRemaining: timeRemaining,
            })
        }

        next()
    } catch (error) {
        console.log(`Error in claim limiter: ${error}`);
        next(error)
    }
}



export { apiLimiter, claimLimiter }
import mongoose from "mongoose";

const ClaimLogSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    browserFingerprint: {
        type: String,
        required: true,
    },
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: true,
    },
    couponCode: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

export const ClaimLog = mongoose.model('ClaimLog', ClaimLogSchema);
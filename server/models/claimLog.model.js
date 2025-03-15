import mongoose from "mongoose";

const ClaimLogSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
    },
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
    expiryDate:{
        type: Date,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

export const ClaimLog = mongoose.model('ClaimLog', ClaimLogSchema);
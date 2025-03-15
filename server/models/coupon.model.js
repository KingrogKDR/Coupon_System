import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  expiryDate: {
    type: Date,
    required: true,
    isExpired: { type: Boolean, default: false },
  },
  isAssigned: {
    type: Boolean,
    default: false,
  },
  assignedTo: {
    ip: String,
    browserFingerprint: String,
    timestamp: Date,
    name: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Coupon = mongoose.model("Coupon", CouponSchema);

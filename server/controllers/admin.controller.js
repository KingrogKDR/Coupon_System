import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { Coupon } from "../models/coupon.model.js";
import { ClaimLog } from "../models/claimLog.model.js";

const checkAdminExists = async (_, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    res.json({
      adminExists: adminCount > 0,
    });
  } catch (error) {
    console.error("Error in checking admin exists:", error);
    res.status(500).send("Server Error");
  }
};

const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide username and password",
      });
    }

    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const admin = new Admin({
      username,
      password,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error("Error in creating admin", error);
    res.status(500).send("Server error");
  }
};

const loginAsAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password fields are required.",
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const payload = {
      admin: {
        id: admin._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).send("Server error");
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    if (!coupons) {
      return res.status(400).json({
        message: "No coupons found",
      });
    }

    res.status(200).json({ coupons });
  } catch (error) {
    console.error("Error getting all coupons:", error);
    res.status(500).send("Server error");
  }
};

const createNewCoupon = async (req, res) => {
  const { code, discountAmount, description, expiryDate, isActive } = req.body;
  try {
    let coupon = await Coupon.findOne({ code });
    if (coupon) {
      return res
        .status(400)
        .json({ message: "Coupon with this code already exists" });
    }
    coupon = new Coupon({
      code,
      discountAmount,
      description,
      expiryDate,
      isActive,
    });

    await coupon.save();
    res.status(201).json({ message: "Coupon created successfully" });
  } catch (error) {
    console.error("Error creating a new coupon:", error);
    res.status(500).send("Server error");
  }
};

const updateCoupon = async (req, res) => {
  const { code, description, discountAmount, expiryDate, isActive } = req.body;

  try {
    let coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (code !== coupon.code) {
      const existingCoupon = await Coupon.findOne({ code });
      if (existingCoupon) {
        return res
          .status(400)
          .json({ message: "Coupon with this code already exists" });
      }
    }

    coupon.code = code || coupon.code;
    coupon.description = description || coupon.description;
    coupon.discountAmount = discountAmount || coupon.discountAmount;
    coupon.expiryDate = expiryDate || coupon.expiryDate;
    coupon.isActive = isActive !== undefined ? isActive : coupon.isActive;

    await coupon.save();
    res.json(coupon);
  } catch (error) {
    console.error("Error updating coupon:", error.message);
    res.status(500).send("Server error");
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await Coupon.deleteOne({ _id: req.params.id });
    res.json({ message: "Coupon removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const getClaimLogs = async (_, res) => {
  try {
    const logs = await ClaimLog.find()
      .populate('couponId', 'code') 
      .sort({ timestamp: -1 });           
    res.json({logs});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


export {
  checkAdminExists,
  createAdmin,
  loginAsAdmin,
  getAllCoupons,
  createNewCoupon,
  updateCoupon,
  deleteCoupon,
  getClaimLogs
};

import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

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

    const jwtToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    )

    return res.status(200).cookie('jsonWebToken', jwtToken, {
        httpOnly: true,
        sameSite: "Lax",
    }).json({ message: "Login successful", token: jwtToken });

  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).send("Server error");
  }
};

export { checkAdminExists, createAdmin, loginAsAdmin };

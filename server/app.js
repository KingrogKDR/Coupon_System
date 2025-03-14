import cookieParser from "cookie-parser";
import e from "express";
import cors from "cors";
import { couponRouter } from "./routes/publicRoutes.js";
import { setBrowserFingerprint } from "./middlewares/browserFingerprint.middleware.js";
import { adminRouter } from "./routes/adminRoutes.js";

const app = e();

app.use(e.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(setBrowserFingerprint)

// routes
app.use("/api/coupons", couponRouter)
app.use("/api/admin", adminRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

export { app };

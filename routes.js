const express = require("express");
const router = express.Router();

const {
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logoutUser,
} = require("./controllers/authController");

// ─── Auth Routes ───────────────────────────────────────
router.post("/login", loginUser); // POST /api/auth/login
router.post("/forgot-password", forgotPassword); // POST /api/auth/forgot-password
router.post("/verify-otp", verifyOtp); // POST /api/auth/verify-otp
router.post("/reset-password", resetPassword); // POST /api/auth/reset-password
router.post("/logout", logoutUser); // POST /api/auth/logout

module.exports = router;

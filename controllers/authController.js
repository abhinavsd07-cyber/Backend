const axios = require("axios");

// ─── Login ───────────────────────────────────────────────────────────────────
exports.loginUser = async (req, res) => {
  try {
    const { EmailID, Password } = req.body;

    const response = await axios.post(
      `${process.env.BASE_URL}/Authentication/token`,
      { EmailID, Password },
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Internal Server Error" }
    );
  }
};

// ─── Forgot Password (Email Validation) ──────────────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { EmailID, businessUID } = req.body;

    const response = await axios.post(
      `${process.env.BASE_URL}/Authentication/user-forgot-password-email-validation`,
      { EmailID, businessUID },
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Forgot Password Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Internal Server Error" }
    );
  }
};

// ─── Verify OTP ────────────────────────────────────────────────────────────────
exports.verifyOtp = async (req, res) => {
  try {
    const { EmailID, OTP } = req.body;

    const response = await axios.post(
      `${process.env.BASE_URL}/Authentication/verify-otp`,
      { EmailID, OTP },
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Verify OTP Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Internal Server Error" }
    );
  }
};

// ─── Reset Password / Update Password ──────────────────────────────────────────
exports.resetPassword = async (req, res) => {
  try {
    const { userUID, PassWord } = req.body;

    const response = await axios.post(
      `${process.env.BASE_URL}/Authentication/reset-user-password`,
      { userUID, PassWord },
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Reset Password Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Internal Server Error" }
    );
  }
};

// ─── Logout ────────────────────────────────────────────────────────────────────
exports.logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization;

    // Call backend logout if available, otherwise just return success
    try {
      await axios.post(
        `${process.env.BASE_URL}/Authentication/logout`,
        {},
        { headers: { "Content-Type": "application/json", Authorization: token || "" } }
      );
    } catch {
      // Ignore backend logout failures — still clear session on frontend
    }

    res.status(200).json({ statusCode: "SB000", message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Logout failed" });
  }
};
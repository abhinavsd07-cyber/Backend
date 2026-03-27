const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// All auth routes mounted at /api/auth
app.use("/api/auth", routes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Server is running", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
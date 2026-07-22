const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "PUPFLIX Backend is running 🚀",
  });
});

module.exports = router;
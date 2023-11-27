const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/auth.js");

router.post("/signup", signup);
router.post("/login", login);
router.post("/request-reset-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

module.exports = router;

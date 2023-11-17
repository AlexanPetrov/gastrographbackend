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
router.post("/request-reset-password", requestPasswordReset); // New route for requesting password reset
router.post("/reset-password", resetPassword); // New route for resetting the password using the token

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { signup, login } = require("../controllers/auth.js");

// router.post("/signup", signup);
// router.post("/login", login);

// module.exports = router;

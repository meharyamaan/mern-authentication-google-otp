const express = require("express");
const passport = require("passport");
const { signup, verifyOtp, signin } = require("../controllers/authController");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/forgotPasswordController");

const router = express.Router();

// auth routes
router.post("/signup", signup);
router.post("/verifyotp", verifyOtp);
router.post("/signin", signin);

// password routes
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

//google routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Successful authentication, generate a JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, name: req.user.name });
  }
);

module.exports = router;

//Db Schema

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: function () {
      // If googleId is not present (email/password login), password is required
      return !this.googleId;
    },
  },
  authProvider: {
    type: String,
    required: true,
    enum: ["google", "email"], // Ensure it is either google or email
  },

  authProvider: {
    type: String,
    default: "local", // "local" for email/password, "google" for OAuth
  },
  googleId: {
    type: String, // Store Google-provided unique user ID
    default: null,
  },
  otp: {
    type: Number,
  },
  otpExpires: {
    type: Date,
  },
});

module.exports = mongoose.model("User", UserSchema);

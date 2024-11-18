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
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
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

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const router = require("./routes/route");
require("dotenv").config();
require("./config/passport");
const passport = require("passport");
// Middleware
app.use(cors());
app.use(express.json());

//creating Db Connection
connectDB();

//APis calling path
app.use("/api/auth", router);

// google
app.use(passport.initialize());

//creating server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}......`);
});

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, displayName, emails } = profile;
        let user = await User.findOne({ googleId: id });

        if (!user) {
          // Create a new user if they don't exist
          user = await User.create({
            name: displayName,
            email: emails[0].value,
            googleId: id,
            authProvider: "google",
            isVerified: true,
            password: "",
          });
        }
        done(null, user); // Proceed to the next middleware
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
);

module.exports = passport;

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
// const User = require("./src/models/UserModel");
const GOOGLE_CLIENT_ID =
  "486352042822-hfbsrcg7jvru5tbqeiq0p91le47hbeij.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:11009/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a user with this Google ID already exists in the database
        // const existingUser = await User.findOne({ userId: profile.id });
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        // if (existingUser) {
        //   // User already exists, simply return the user
        //   return done(null, existingUser);
        // } else {
        //   const email =
        //     profile.emails && profile.emails[0]
        //       ? profile.emails[0].value
        //       : null;
        //   console.log("email", email);

        // User does not exist, create a new user based on the Google profile
        // const newUser = new User({
        //   userId: profile.id,
        //   firstname: profile.name.givenName,
        //   lastname: profile.name.familyName,
        //   email: profile._json.email, // Add the email if available
        //   // You can add other fields as needed
        // });

        // // Save the new user to the database
        // await newUser.save();

        // Return the newly created user
        return done(null, profile);
      } catch (error) {
        // Handle any errors that occur during the database operations
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
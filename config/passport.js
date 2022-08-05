const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const passport = require("passport");
const config = require("./config");
const { tokenTypes } = require("./tokens");
const { User } = require("../models");

const googleOptions = {
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: `${config.appUrl}/v1/auth/google/redirect`,
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

const googleVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
    }
    done(null, user);
  } catch (error) { 
     done(error, false);
  }
};

const googleStrategy = new GoogleStrategy(googleOptions, googleVerify);

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
  googleStrategy,
};

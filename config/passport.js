const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const config = require("./config");
const { tokenTypes } = require("./tokens");
const { User } = require("../models");

const googleOptions = {
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: "/v1/auth/google/redirect",
};

const googleVerify = () => {};

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

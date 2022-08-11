const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const cookieParser = require("cookie-parser");
const { errorConverter, errorHandler } = require("./middlewares/error");
const { authLimiter } = require("./middlewares/rateLimiter");
const { jwtStrategy } = require("./config/passport");
const config = require("./config/config");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(helmet());

app.use(cors());
app.options("*", cors());

app.use(passport.initialize());

passport.use("jwt", jwtStrategy);

if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;

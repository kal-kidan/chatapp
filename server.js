const express = require("express");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const { errorConverter, errorHandler } = require("./middlewares/error");
const { authLimiter } = require("./middlewares/rateLimiter");
const { jwtStrategy } = require("./config/passport");
const config = require("./config/config");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");

const app = express();
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// bootstrap, jquery
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use("/images", express.static(path.join(__dirname, "views/images")));
app.use("/styles", express.static(path.join(__dirname, "views/css")));
app.use("/scripts", express.static(path.join(__dirname, "views/scripts")));
// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;

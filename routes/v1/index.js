const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const docsRoute = require("./docs.route");
const homeRoute = require("./home.route");
const chatRoute = require("./chat.route");
const config = require("../../config/config");
const auth = require("../../middlewares/auth");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/",
    route: homeRoute,
  },
  {
    path: "/chat",
    route: chatRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  if (route !== "/docs" && route !== "/auth") {
    router.use(auth());
  }
  router.use(route.path, route.route);
});

if (config.env !== "production") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

const httpStatus = require("http-status");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");

const googleLogIn = async (req, res) => {
  console.log(req, res);
};

const googleRedirect = catchAsync(async (req, res, next) => {
  passport.authenticate("google", async function (err, user, info) {
    if (err || !user) {
      return res
        .cookie("error", "Unable to login, please try again", { maxAge: 100 })
        .redirect("/v1");
    }
    const tokens = await tokenService.generateAuthTokens(user);
    res = setCookie(res, {
      id: user.id,
      accessToken: tokens.access.token,
      refreshToken: tokens.refresh.token,
    });
    res.redirect("/v1/home");
  })(req, res, next);
});

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res = setCookie(res, {
    id: user.id,
    accessToken: tokens.access.token,
    refreshToken: tokens.refresh.token,
  });
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res = setCookie(res, {
    id: user.id,
    accessToken: tokens.access.token,
    refreshToken: tokens.refresh.token,
  });
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const setCookie = (res, data) => {
  let expiryTime = new Date().getTime() + 1000 * 36000;
  const cookieOption = { maxAge: expiryTime, httpOnly: true, encode: (v) => v };
  res
    .cookie("uid", data.id, { ...cookieOption, httpOnly: false })
    .cookie("access", data.accessToken, cookieOption)
    .cookie("refresh", data.refreshToken, cookieOption);
  return res;
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  googleRedirect,
  googleLogIn,
};

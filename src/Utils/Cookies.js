const sendCookie = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * (24 * 60 * 60 * 1000)
    ),
    httpOnly: false,
    sameSite: "None",
    secure: true,
    domain:"www.tradingaddaacademy.in",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendCookie;

const jwt = require("jsonwebtoken");
const secret = "jwtsecret";

const authMiddleware = (req, res, next) => {
  console.log("hey");
  const headers = req.headers;
  console.log(headers);
  try {
    const decoded = jwt.verify(headers.token, secret);
    if (decoded) {
      req.user = decoded.username;
      console.log("somethings right");
      next();
    }
  } catch (err) {
    console.log("something web");
    req.user = null;
    res.status(400).json({ msg: "Not authenticated" });
    return;
  }
};

module.exports = authMiddleware;

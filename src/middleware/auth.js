const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.send("No token, access denied ❌");
    }

    const verified = jwt.verify(token, "secretkey123");

    req.user = verified;

    next();

  } catch (error) {
    res.send("Invalid token ❌");
  }
};

module.exports = authMiddleware;
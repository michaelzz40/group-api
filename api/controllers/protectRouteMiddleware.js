const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

module.exports = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "" + process.env.JWT_KEY);

      req.user = await User.findOne({ where: { userId: decoded.id } });

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

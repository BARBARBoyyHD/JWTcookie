require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports =  authenticateUser ;

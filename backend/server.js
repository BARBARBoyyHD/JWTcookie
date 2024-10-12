require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const authenticateUser = require("./middleware/authenticateUser");

// Token generation functions
const generateAccessToken = () => {
  return jwt.sign({ user: "admin" }, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "15s",
  });
};

const generateRefreshToken = () => {
  return jwt.sign({ user: "admin" }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// Middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());

const port = 5000;

// Root route that sets cookies
app.get("/", (req, res) => {
  const accessToken = generateAccessToken();
  const refreshToken = generateRefreshToken();

  res
    .status(202)
    .cookie("accessToken", accessToken, { httpOnly: true ,expiresIn: "5s",secure: true,sameSite:"strict"}) 
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expiresIn: "1d",
      secure: true,
      sameSite:"strict"
    })
    .send("Tokens generated and stored in cookies");
});

// Route to delete cookies
app.get("/deleteCookie", (req, res) => {
  res
    .status(202)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .send("Cookies have been deleted");
});

app.get("/dashboard", authenticateUser, (req, res) => {
    // Only users with valid access tokens can access this route
    res.send(`Hello ${req.user.user}, welcome to your dashboard!`);
  });
  
app.get("/getAllData",authenticateUser,(req,res)=>{
    res.json({
        name:"uwi",
        age:21
    })
})
  
app.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
      return res.status(401).send("Access Denied: No Refresh Token Provided");
    }
  
    try {
      // Verify the refresh token
      const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  
      // Generate a new access token
      const newAccessToken = jwt.sign({ user: verified.user }, process.env.ACCES_TOKEN_SECRET, { expiresIn: "15s" });
  
      // Send the new access token in an HttpOnly cookie
      res
        .cookie("accessToken", newAccessToken, { httpOnly: true, secure: true })
        .send("New access token issued");
    } catch (err) {
      return res.status(403).send("Invalid Refresh Token");
    }
  });
  

// Server listening
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

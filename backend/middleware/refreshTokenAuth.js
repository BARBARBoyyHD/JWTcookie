require("dotenv").config()
const jwt = require("jsonwebtoken")

const refreshTokenAuth = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        return res.status(401).send("Access Denied: No Refresh Token Provided")
    }

    try {
        const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        req.user = verified

    } catch (error) {
        return res.status(403).send("Invalid Refresh Token")
    }

}

module.exports = refreshTokenAuth
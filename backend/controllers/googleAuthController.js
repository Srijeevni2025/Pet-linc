const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

exports.googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    // 1️⃣ Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;
    

    // 2️⃣ Find or create user
    
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        email,
        name,
        googleId: sub,
        authProvider: "google",
      });
      
    }
    

    // 3️⃣ Create YOUR JWT
    const jwtToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4️⃣ Send JWT via cookie
    res.cookie("jwt", jwtToken, {
       expires: new Date(Date.now() + 60*60*1000),
        secure:true,   // if it is set to false then the cookies are blocked by browser and will not be attached with any http request from browser side.
        httpOnly:true,
        sameSite:'None',
        domain:".petlinc.in"
    });

    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

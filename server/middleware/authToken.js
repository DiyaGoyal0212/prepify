const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "User not logged in",
        error: true,
        success: false,
      });
    }
    

    // Debugging: Manually decode before verification
    const decodedBefore = jwt.decode(token);
    console.log("Decoded Token (Before Verify):", decodedBefore);
    console.log("Verifying Token with Secret Key:", process.env.TOKEN_SECRET_KEY);

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err);

        return res.status(403).json({ message: "Invalid token", error: true });
      }

      console.log("Decoded Token (After Verify):", decoded);
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
    });
  }
}

module.exports = authToken;

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required. No Bearer token provided." });
  }

  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return res.status(401).json({ message: "Invalid token format." });
  }

  const secret = process.env.JWT_SECRET || (process.env.NODE_ENV === "production" ? null : "dev_fallback_secret");
  if (!secret) {
    console.error("CRITICAL: JWT_SECRET is not configured in production environment!");
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }
    return res.status(401).json({ message: "Invalid or corrupted token." });
  }
};

module.exports = authMiddleware;


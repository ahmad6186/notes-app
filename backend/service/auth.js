const sessionIdTOUserMap = new Map();
const User = require("../models/users");

async function authenticateUser(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"]; // headers are lowercased

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  // Example: Bearer abc123token
  const token = authHeader.split(" ")[1]; // remove "Bearer"

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  // Find user with matching sessionId
  const user = await User.findOne({ sessionId: token });

  if (!user) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  // ✅ Check sessionExpiry
  if (user.sessionExpiry && new Date(user.sessionExpiry) < new Date()) {
    // Session has expired
    // Instead of throwing error, you can choose to refresh or just pass through
    console.warn(`Session expired for user: ${user._id}`);
    // If you don’t want to throw error:
    // return next();
    // If you want to reject expired sessions:
    return res.status(403).json({ error: "Session expired" });
  }

  // Attach user to request object
  req.user = user;
  next();
}

module.exports = { authenticateUser };

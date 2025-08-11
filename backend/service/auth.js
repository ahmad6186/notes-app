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

  // OPTIONAL: verify the token (e.g., against session store or JWT)
  // Example: if you're using session map:
  const user = await User.findOne({ sessionId: token }); // Implement getUser logic

  if (!user) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
  // console.log("User found: ", user);
  req.user = user; // attach user to request
  next(); // proceed to next middleware or route
}

module.exports = { authenticateUser };

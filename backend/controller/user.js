const { findOne } = require("../models/notes");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/users");
const { setUser } = require("../service/auth");
async function handleSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.status(201).json({ message: "User created" });
}
async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(400).json({ error: "invalid email or password" });
  }

  await User.findByIdAndUpdate(user.id, {
    sessionId: uuidv4(),
    sessionExpiry: new Date(Date.now() + 60 * 60 * 1000),
  });

  const updatedUser = await User.findById(user.id);
  return res.status(201).json(updatedUser);
}
async function handleLogout(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { sessionId: null, sessionExpiry: null } },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: "Server error during logout" });
  }
}

module.exports = { handleSignup, handleLogin, handleLogout };

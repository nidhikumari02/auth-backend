require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
  const { email, password, name, date_of_birth, contact, address } = req.body;
  try {
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      date_of_birth,
      contact,
      address,
    });
    const newUser = await user.save();
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JSONWEBTOKEN_SECRET,
      { expiresIn: 86400 }
    );
    res.status(200).json({
      message: "User registered successfully",
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      authtoken: token,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Email is not valid" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JSONWEBTOKEN_SECRET,
      { expiresIn: 86400 }
    );
    const updatedUser = await user.save();
    return res.status(200).json({
      message: "User logged in successfully",
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      authtoken: token,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

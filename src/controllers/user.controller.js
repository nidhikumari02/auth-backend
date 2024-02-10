const User = require("../models/user.model");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.authInfo.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      address: user.address,
      date_of_birth: user.date_of_birth,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    await User.update(
      req.body,
      { where: { id: req.authInfo.id } },
      { returning: true }
    );
    const updatedUser = await User.findByPk(req.authInfo.id, {
      attributes: {
        exclude: ["password", "id", "email", "createdAt", "updatedAt"],
      },
    });
    res
      .status(200)
      .json({ message: "User profile updated successfully", updatedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

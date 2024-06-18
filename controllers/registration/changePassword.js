import userModel from "../../models/User.js";

export const changePassword_get = async (req, res) => {
  res.render("registration/changePassword", { title: "Change passwod" });
};

export const changePassword_post = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ errMsg: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json({ errMsg: err });
  }
};

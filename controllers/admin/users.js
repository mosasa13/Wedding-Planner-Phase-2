import User from "../../models/User.js";
import mongoose from "mongoose";

const users_get = async (req, res) => {
  res.render("admin/users", {
    title: "Users",
    user: await User.findById(req.params.id),
    users: await User.find(),
  });
};

const users_post = async (req, res) => {
  let newUser;
  try {
    const { email, username, password, role, fullName, gender, phone, city } =
      req.body;

    if (await User.findOne({ email }))
      return res.status(409).json({ errMsg: "Email is Taken" });

    if (await User.findOne({ username }))
      return res.status(409).json({ errMsg: "Username is Taken" });

    if (await User.findOne({ phone }))
      return res.status(409).json({ errMsg: "Phone number is Taken" });

    newUser = new User({
      email,
      username,
      password,
      role,
      fullName,
      gender,
      phone,
      city,
    }).save();
  } catch (err) {
    return res.status(409).json({ errMsg: err });
  }

  return res.status(201).json({ user: newUser });
};

const users_delete = async (req, res) => {
  const { userId } = req.params;


  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send(`No user with id: ${userId}`);

  await User.findByIdAndDelete(userId);

  res.json({ message: "User deleted successfully" });
};

export default { users_get, users_post, users_delete };

import userModel from "../../models/User.js";

const users_get = async (req, res) => {
  res.render("admin/users", {
    title: "Users",
    user: await userModel.findById(req.params.id),
    users: await userModel.find(),
  });
};

const users_post = async (req, res) => {
  let newUser;
  try {
    const { email, username, password, role, fullName, gender, phone, city } =
      req.body;

    if (await userModel.findOne({ email }))
      return res.status(409).json({ errMsg: "Email is Taken" });

    if (await userModel.findOne({ username }))
      return res.status(409).json({ errMsg: "Username is Taken" });

    if (await userModel.findOne({ phone }))
      return res.status(409).json({ errMsg: "Phone number is Taken" });

    newUser = new userModel({
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

export default { users_get, users_post };

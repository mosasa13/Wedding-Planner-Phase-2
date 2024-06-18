import userModel from "../../models/User.js";

export const signUp_get = async (req, res) => {
  res.render("registration/signUp", { title: "Sign up" });
};

export const signUp_post = async (req, res) => {
  let newUser;
  try {
    const { email, username, password, fullName, gender, phone, city } =
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

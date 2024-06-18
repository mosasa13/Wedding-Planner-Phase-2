import userModel from "../../models/User.js";
import jwt from "jsonwebtoken";
import secrets from "../../config/secrets.js";

const {jwt_secret_phrase} = secrets;

export const signIn_get = async (req, res) => {
  res.render("registration/signIn", { title: "Sign in" });
};

export const signIn_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const founduser = await userModel.findOne({ username });

    if (!founduser || !founduser.comparePassword(password, founduser.password))
      return res.status(401).json({ errMsg: "Wrong username or password" });

    const token = jwt.sign({ user: founduser }, jwt_secret_phrase, {
      expiresIn: 3 * 24 * 60 * 60, //3 days
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, //3 days
    });

    res.status(200).json({ user: founduser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err });
  }
};

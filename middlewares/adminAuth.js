import jwt from "jsonwebtoken";
import secrets from "../config/secrets.js";

const { jwt_secret_phrase } = secrets;

export default (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwt_secret_phrase, (err, decodedToken) => {
      if (decodedToken.user.role == "admin") next();
      else res.redirect(`/signin`);
    });
  } else res.redirect(`/signin`);
};

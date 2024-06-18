import express from "express";

import { signIn_get, signIn_post } from "../controllers/registration/signin.js";
import { signUp_get, signUp_post } from "../controllers/registration/signUp.js";
import { forgetPassword_get, forgetPassword_post } from "../controllers/registration/forgetPassword.js";
import { changePassword_get, changePassword_post } from "../controllers/registration/changePassword.js";

const router = express.Router();

router.get("/signin", signIn_get);
router.post("/signin", signIn_post);

router.get("/signup", signUp_get);
router.post("/signup", signUp_post);

router.get("/forgetpassword", forgetPassword_get);
router.post("/forgetpassword", forgetPassword_post);

router.get("/changepassword/:id", changePassword_get);
router.post("/changepassword/:id", changePassword_post);

router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

export default router;

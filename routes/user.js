import express from "express";
const router = express.Router();

import home from "../controllers/user/home.js";

router.get("/:id", home.home_get);

export default router;

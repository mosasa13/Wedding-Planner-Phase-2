// routes/halls.js
import express from "express";
const router = express.Router();

import { halls_get, halls_post } from "../controllers/admin/halls.js";

router.get("/", halls_get);
router.post("/", halls_post);

export default router;

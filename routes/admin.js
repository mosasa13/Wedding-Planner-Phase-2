import express from "express";
const router = express.Router();

import dashboard from "../controllers/admin/dashboard.js";
import users from "../controllers/admin/users.js";
import decoration from "../controllers/admin/decoration.js";
import food from "../controllers/admin/food.js";
import makeup from "../controllers/admin/makeup.js";
import music from "../controllers/admin/music.js";
import photographer from "../controllers/admin/photographer.js";
import videographer from "../controllers/admin/videographer.js";
import halls from "../controllers/admin/halls.js";
import chats from "../controllers/admin/chats.js";
import reviews from "../controllers/admin/reviews.js";

router.get("/:id/", dashboard.dashboard_get);
router.get("/:id/users", users.users_get);
router.post("/add/user", users.users_post);
router.get("/:id/decoration", decoration.decoration_get);
router.get("/:id/food", food.food_get);
router.get("/:id/makeup", makeup.makeup_get);
router.get("/:id/music", music.music_get);
router.get("/:id/photographer", photographer.photographer_get);
router.get("/:id/videographer", videographer.videographer_get);
router.get("/:id/halls", halls.halls_get);
router.get("/:id/chats", chats.chat_get);
router.get("/:id/reviews", reviews.reviews_get);

export default router;

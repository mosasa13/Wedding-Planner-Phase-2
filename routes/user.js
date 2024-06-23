import express from "express";
const router = express.Router();

import home from "../controllers/user/home.js";
import services from "../controllers/user/services.js";
import shop from "../controllers/user/shop.js";
import user from "../controllers/user/user.js";

router.get("/:id", home.home_get);
router.get("/:id/services", services.services_get);
router.get("/:id/shop", shop.shop_get);

router.put("/:id/cart", user.addToCart_put);



export default router;

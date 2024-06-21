import express from "express";
import multer from "multer";
import path from "path";
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
import products from "../controllers/admin/products.js";

// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

// Check file type
function checkFileType(file, cb) {
  // Allowed file types
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.get("/:id/", dashboard.dashboard_get);

router.get("/:id/users", users.users_get);
router.post("/user", users.users_post);
router.delete("/user/:userId", users.users_delete);

router.get("/:id/products", products.products_get);
router.post("/product", products.createProduct_post);
router.post("/upload/image", upload, products.uploadImage_post); // Use 'upload' middleware here
router.delete("/product/:productId", products.deleteProductById_delete);

router.get("/:id/decoration", decoration.decoration_get);
router.get("/:id/food", food.food_get);
router.get("/:id/makeup", makeup.makeup_get);
router.get("/:id/music", music.music_get);
router.get("/:id/photographer", photographer.photographer_get);
router.get("/:id/videographer", videographer.videographer_get);
router.get("/:id/halls", halls.halls_get);
router.get("/:id/chats", chats.chat_get);

export default router;

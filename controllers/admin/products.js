import User from "../../models/User.js";
import Product from "../../models/Product.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const products_get = async (req, res) => {
  try {
    const products = await Product.find();
    const user = await User.findById(req.params.id);
    res.render("admin/products", {
      title: "Products",
      user,
      products,
    });
  } catch (error) {
    res.status(500).json({ errMsg: error.message });
  }
};

const createProduct_post = async (req, res) => {
  const productData = req.body;

  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    res.json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ errMsg: error.message });
  }
};

const uploadImage_post = async (req, res) => {
  const imageUrl = "/uploads/" + req.file.filename;
  res.json({ imageUrl });
};

const deleteProductById_delete = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    for (const imagePathObj of product.images) {
      const myPath = path.join(
        String(__dirname),
        "..",
        "..",
        "public",
        String(imagePathObj)
      );

      fs.unlink(myPath, (error) => {
        if (error) {
          return res.status(500).json({ errMsg: error });
        }
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ errMsg: error });
  }
};

export default {
  products_get,
  createProduct_post,
  uploadImage_post,
  deleteProductById_delete,
};

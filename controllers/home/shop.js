import Product from "../../models/product.js";

const shop_get = async (req, res) => {
  res.render("./shop.ejs", {
    title: "Shop",
    user: null,
    products: await Product.find(),
  });
};

export default { shop_get };

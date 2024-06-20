import userModel from "../../models/User.js";

const products_get = async (req, res) => {
  res.render("admin/products", {
    title: "Reviews",
    user: await userModel.findById(req.params.id),
  });
};

export default { products_get };

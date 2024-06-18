import userModel from "../../models/User.js";

const reviews_get = async (req, res) => {
  res.render("admin/reviews", {
    title: "Reviews",
    user: await userModel.findById(req.params.id),
  });
};

export default { reviews_get };

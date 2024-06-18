import userModel from "../../models/User.js";

const food_get = async (req, res) => {
  res.render("admin/food", {
    title: "Food",
    user: await userModel.findById(req.params.id),
  });
};

export default { food_get };

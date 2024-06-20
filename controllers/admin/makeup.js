import userModel from "../../models/User.js";

const makeup_get = async (req, res) => {
  res.render("admin/music", {
    title: "Makeup",
    user: await userModel.findById(req.params.id),
  });
};

export default { makeup_get };

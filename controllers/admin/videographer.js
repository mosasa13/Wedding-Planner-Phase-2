import userModel from "../../models/User.js";

const videographer_get = async (req, res) => {
  res.render("admin/videographer", {
    title: "Videographer",
    user: await userModel.findById(req.params.id),
  });
};

export default { videographer_get };

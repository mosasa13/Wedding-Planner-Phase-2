import userModel from "../../models/User.js";

const photographer_get = async (req, res) => {
  res.render("admin/photographer", {
    title: "Photographer",
    user: await userModel.findById(req.params.id),
  });
};

export default { photographer_get };

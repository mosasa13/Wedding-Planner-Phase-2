import userModel from "../../models/User.js";

const decoration_get = async (req, res) => {
  res.render("admin/decoration", {
    title: "Decoration",
    user: await userModel.findById(req.params.id),
  });
};

export default { decoration_get };

import userModel from "../../models/User.js";

const dashboard_get = async (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard",
    user: await userModel.findById(req.params.id),
  });
};

export default { dashboard_get };

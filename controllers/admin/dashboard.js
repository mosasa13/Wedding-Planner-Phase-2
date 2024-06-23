import User from "../../models/User.js";

const dashboard_get = async (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard",
    user: await User.findById(req.params.id),
  });
};

export default { dashboard_get };

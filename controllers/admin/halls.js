import userModel from "../../models/User.js";
const halls_get = async (req, res) => {
  res.render("admin/halls", {
    title: "Halls",
    user: await userModel.findById(req.params.id),
  });
};

export default { halls_get };

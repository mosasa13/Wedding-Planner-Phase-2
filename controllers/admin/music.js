import userModel from "../../models/User.js";

const music_get = async (req, res) => {
  res.render("admin/music", {
    title: "Music",
    user: await userModel.findById(req.params.id),
  });
};

export default { music_get };

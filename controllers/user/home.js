import User from "../../models/User.js";

const home_get = async (req, res) => {
  res.render("index", {
    title: "Home",
    user: await User.findById(req.params.id),
  });
};

export default { home_get };

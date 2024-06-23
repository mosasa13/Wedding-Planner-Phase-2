import User from "../../models/User.js";

const chat_get = async (req, res) => {
  res.render("admin/chats", {
    title: "Chats",
    user: await User.findById(req.params.id),
  });
};

export default { chat_get };

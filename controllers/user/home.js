const home_get = async (req, res) => {
  res.render("user/home", {
    title: "Home",
  });
};
export const home_post = async (req, res) => {};

export default { home_get, home_post };

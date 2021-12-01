const index = async (req, res) => {
  res.render("index");
};

const home = async (req, res) => {
  res.render("home");
};

module.exports = {
  index,
  home,
};

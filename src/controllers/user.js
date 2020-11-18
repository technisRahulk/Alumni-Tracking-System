const User = require("../models/User");

exports.signUp = async (req, res) => {
  const user = new User(req.body);

  const doesExits = await User.findOne({ email : user.email });
  if (doesExits) {
    return res.json("Account already exits");
  }

  try {
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(400).send({ error: "Something went wrong" });
    }
    const token = await user.generateAuthToken();
// extractUser;
    res.status(201).send({ user: user.extractUser(), token });
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user: user.extractUser(), token });
  } catch (e) {
    res.status(400).send();
  }
};

exports.logout = async (req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
// diffrence det logout and logoutall

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

exports.readUser = async (req, res) => {
  res.send(req.user);
};

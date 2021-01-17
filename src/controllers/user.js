const User = require("../models/User");
const sharp = require("sharp");

/*Endpoints for Signing Up, Logging In, Logging Out, and Logging out from all sessions*/
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
    res.status(400).send({Error: "Invalid Email or Password!"});
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

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

/*Endpoints for Reading, Updating and Deleting a logged in User*/

exports.readUser = async (req, res) => {
  res.send(req.user);
};

exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "branch", "batch"]; //here more options are left to be added
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid updates" });
  }

  try {
    const user = req.user; // changed so as to add auth to update
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
};

/*Endpoints for Getting, Uploading and Deleting profile picture*/
exports.getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) throw new Error();

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
};

exports.uploadAvatar = async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send("Uploaded!");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
};

exports.deleteAvatar = async (req, res) => {
    try {
      req.user.avatar = undefined;
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
};
const User = require("../models/User");

exports.signUp = async (req, res) => {
    const user = new User(req.body);
  
    const doesExits = await User.findOne({email});
    if(doesExits) {
        return res.json("Account already exits");
    }
  
    try {
        await user.save();
        const token = await user.generateAuthToken();
  
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
}
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
}

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
    });
  
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
}

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
}

exports.readUser = async (req, res) => {
  
    res.send(req.user);
}
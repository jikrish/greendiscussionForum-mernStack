const bcrypt = require("bcrypt");
const User = require("../models/user");
const passportLocal = require("passport-local").Strategy; // -01
const cookieParser = require("cookie-parser"); // cookie parser
const passport = require("passport");

// const login = (req, res) => {};
const register = (req, res) => {
  User.findOne({ username: req.body.username }, async (error, user) => {
    if (error) res.json({ error: error.message });
    if (user) res.send("User already exists");
    if (!user) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ message: "success" });
    }
  });
};

module.exports = { register };

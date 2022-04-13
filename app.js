const express = require("express");
const app = express();
const cors = require("cors");
const discussionRouter = require("./routes/discussion");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

const passport = require("passport");
const cookieParser = require("cookie-parser"); // cookie parser
const bcrypt = require("bcrypt"); //bcrypt

const session = require("express-session"); //express-session

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/api/discussion", discussionRouter);
app.use("/api/register", registerRouter);
// app.use("/api/login", loginRouter);

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user)
      res.status(404).json({
        message: "No user exists",
      });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({ message: "success" });
      });
    }
  })(req, res, next);
});

module.exports = app;

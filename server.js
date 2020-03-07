const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("./is-auth");
const { check, validationResult } = require("express-validator");
const User = require("./User");
const path = require("path");
const helmet = require("helmet");

const port = process.env.PORT || 3001;
const app = express();

const db = require("./config/keys").mongoURI;
const JWT_STRING = require("./config/keys").jwtString;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.post(
  "/register",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const password = req.body.password;
      const email = req.body.email;
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        const error = new Error();
        error.statusCode = 422;
        error.message = "There already is an account with such e-mail.";
        throw error;
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      const createdUser = await user.save();
      const token = jwt.sign({ email }, process.env.JWT_STRING, {
        expiresIn: "1h"
      });
      res.status(201).json({
        message: "Account created.",
        token,
        dataObj: createdUser.dataObj
      });
    } catch (error) {
      next(error);
    }
  }
);
app.post(
  "/login",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const password = req.body.password;
      const email = req.body.email;
      const loadedUser = await User.findOne({ email });
      if (!loadedUser) {
        const error = new Error();
        error.statusCode = 401;
        error.message = "A user with this email could not be found.";
        throw error;
      }
      const arePasswordsEqual = await bcrypt.compare(
        password,
        loadedUser.password
      );
      if (!arePasswordsEqual) {
        const error = new Error();
        error.statusCode = 401;
        error.message = "Wrong password.";
        throw error;
      }

      const token = jwt.sign(
        { email, userId: loadedUser._id.toString() },
        JWT_STRING,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token,
        dataObj: loadedUser.dataObj
      });
    } catch (error) {
      next(error);
    }
  }
);

app.post("/updateDataObj", isAuth, async (req, res, next) => {
  try {
    const email = req.email;
    const { dataObj } = req.body;
    await User.findOneAndUpdate({ email }, { dataObj });
    res.status(200).send("Updated");
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message });
});

app.listen(port);

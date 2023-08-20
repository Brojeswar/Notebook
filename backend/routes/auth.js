const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "";

// ROUTE1: create a user using POST: "/api/auth/createuser" (no login required)
router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 4 characters").isLength({
    min: 4,
  }),
  async (req, res) => {
    let success = false;
    // if there are error return bad request with the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check whether a user with the same eamil already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "A user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const jwtData = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(jwtData, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE2: authenticate a user using POST: "/api/auth/login" (no login required)
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    let success = false;
    // if there are error return bad request with the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const loggedIn = await bcrypt.compare(password, user.password);
      if (!loggedIn) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const jwtData = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(jwtData, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE3: Get loggedin user details using POST: "/api/auth/getuser" (login required)
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await users.find((user) => user.email === email);
    
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      message: "Signed in successfully",
      user: {
        email: user.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    })
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirmPassword} = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password do not match",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
      },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: "7d",
      },
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        username: newUser.username,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
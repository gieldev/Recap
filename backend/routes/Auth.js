const router = require("express").Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const users = [
  { id: 1, email: "argiel@example.com", password: "123" },
]

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

module.exports = router;
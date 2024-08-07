const express = require("express");
const router = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const secret = "jwtsecret";
const { User } = require("../models/schemas");
const authMiddleware = require("../middleware/helper");

const userZodSchema = z.object({
  username: z.string(),
  password: z.string().min(4),
});

const userIsPresent = async (usernameParam) => {
  try {
    const user = await User.exists({ username: usernameParam });
    if (user) return true;
    return false;
  } catch (err) {
    console.error("Error occurred while checking user existence:", err.message);
    return false;
  }
};

router.post("/signup", async (req, res, next) => {
  const userSentCred = req.body;
  const newUser = {
    username: userSentCred.username,
    password: userSentCred.password,
  };
  console.log("newusr", newUser);
  const check = userZodSchema.safeParse(newUser);
  const sameUsername = await userIsPresent(newUser.username);
  if (!check.success || sameUsername) {
    res.status(400).send("something went wrong in schema");
    return;
  }

  try {
    await User.create(newUser);
    const token = jwt.sign({ username: newUser.username }, secret);
    res.status(200).json({ msg: "Created user", token });
  } catch (err) {
    console.log(err);
    res.status(400).send("something went wrong");
  }
});

router.post("/login", async (req, res, next) => {
    const userSentCred = req.body;
    const newUser = {
      username: userSentCred.username,
      password: userSentCred.password,
    };
  const check = userZodSchema.safeParse(newUser);
  if (!check.success) res.status(400).send('zod gone');
  try {
    const user = await User.findOne({ username: newUser.username });
    console.log(user);
    if (user.password == userSentCred.password) {
      const token = jwt.sign({ username: userSentCred.username }, secret);
      res.status(200).json({ msg: "Logged IN", token });
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

router.get('/username', authMiddleware, (req, res, next) => {
  res.status(200).json({username: req.user})
})

module.exports = router;

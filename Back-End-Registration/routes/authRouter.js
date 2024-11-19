import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from 'node:crypto';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({error: 'Invalid registration'});
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiresAt = Date.now() + 1000 * 60 * 60 * 24;

    const user = await User.create({
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
      tokenExpiresAt: tokenExpiresAt,
      verified: true 
    })

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
  
})

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({error: 'Invalid login'});
  }

  try {
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(401).json({error: 'Invalid login'});
    }
    if (!user.verified) {
      return res.status(403).json({error: "Account not verified"});
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({error: 'Invalid login'});
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    res.json({user: user, token: token});

  } catch (error) {
    res.status(500).json({error: error.message});
  }
  
})

router.get("/verify/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const user = await User.findOne({verificationToken: token});
    if (user && Date.now() < user.tokenExpiresAt) {
      user.verified = true;
      user.verificationToken = undefined;
      user.tokenExpiresAt = undefined;
      await user.save();
      res.json({"message": "Your account has been successfully verified."});
    } else {
      res.status(400).json({error: "Invalid or expired token. Please request a new verification email."})
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

export default router;
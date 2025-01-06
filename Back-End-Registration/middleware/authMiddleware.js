import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send();
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({_id: decoded.userId});
    req.user = user;
    next();
  } catch(err) {
    return res.status(401).send();
  }
}
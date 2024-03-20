import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    next(handleError(403, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err, user);

    if (err) {
      next(handleError(403, "Unauthorized"));
    }

    req.userId = user.userId;
    req.role = user.role;
    next();
  });
};

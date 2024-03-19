import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { generateProfilePicture } from "../utils/generateProfilePicture.js";
import { handleError } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return next(handleError(400, "Username already exists"));
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return next(handleError(400, "Email already exists"));
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const profilePicture = generateProfilePicture(username);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture,
    });

    await user.save();

    const { password: userPassword, ...userData } = user._doc;

    return res
      .status(201)
      .json({ success: true, message: "User created", data: userData });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(handleError(400, "Invalid Email or Password"));
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return next(handleError(400, "Invalid Email or Password"));
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    const { password: userPassword, ...userData } = user._doc;

    res.cookie("jwt_token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "User signed in",
      token,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res) => {
  res.clearCookie("jwt_token");
  return res.status(200).json({ message: "User signed out" });
};

export const googleAuth = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      const token = jwt.sign(
        { userId: userExists._id, role: userExists.role },
        process.env.JWT_SECRET,
        { expiresIn: "15d" }
      );

      const { password: userPassword, ...userData } = userExists._doc;

      res.cookie("jwt_token", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      return res.status(200).json({
        success: true,
        message: "User signed in",
        token,
        data: userData,
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 12);
      const profilePicture = googlePhotoUrl || generateProfilePicture(name);
      // to avoid duplicate usernames from google;

      const user = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-5),
        email,
        password: hashedPassword,
        profilePicture,
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15d" }
      );

      const { password: userPassword, ...userData } = user._doc;

      res.cookie("jwt_token", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      return res.status(201).json({
        success: true,
        message: "User created",
        token,
        data: userData,
      });
    }
  } catch (error) {
    next(error);
  }
};

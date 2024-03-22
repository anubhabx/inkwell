import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";

export const updateProfile = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = await User.findById(id);
  if (id !== req.userId) next(handleError(403, "Unauthorized"));

  if (!req.body.username && !req.body.email && !req.body.password)
    next(handleError(400, "No changes submitted"));

  if (req.body.password) {
    if (req.body.password.length < 6)
      next(handleError(400, "Password must be at least 6 characters"));

    if (req.body.password.includes(" "))
      next(handleError(400, "Password cannot contain spaces"));

    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username === currentUser.username)
      next(handleError(400, "Username is the same as the current one"));
    if (req.body.username.length < 3 || req.body.username.length > 30)
      next(handleError(400, "Username must be between 3 and 30 characters"));

    if (req.body.username.includes(" "))
      next(handleError(400, "Username cannot contain spaces"));

    if (req.body.username.match(/[^a-zA-Z0-9_]/))
      next(
        handleError(
          400,
          "Username can only contain letters, numbers, and underscores"
        )
      );

    const existingUsername = await User.findOne({
      username: req.body.username,
    });

    if (
      existingUsername &&
      existingUsername._id.toString() !== currentUser._id.toString()
    )
      next(handleError(400, "Username is already taken"));
  }

  if (req.body.email) {
    if (req.body.email === currentUser.email)
      next(handleError(400, "Email is the same as the current one"));
    if (!req.body.email.includes("@") || !req.body.email.includes("."))
      next(handleError(400, "Invalid email"));

    const existingEmail = await User.findOne({ email: req.body.email });

    if (
      existingEmail &&
      existingEmail._id.toString() !== currentUser._id.toString()
    )
      next(handleError(400, "Email is already taken"));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture || currentUser.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...userData } = updatedUser._doc;

    res.status(200).json({
      success: true,
      message: "Profile updated",
      data: userData,
    });
  } catch (error) {
    next(handleError(error));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { currentUser } = req.userId;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const users = await User.find({ _id: { $ne: currentUser } })
      .select("-password")
      .limit(limit)
      .skip(skip);

    const totalUsers = await User.countDocuments({ _id: { $ne: currentUser } });

    const dateToday = new Date();

    const oneMonthAgo = new Date(
      dateToday.getFullYear(),
      dateToday.getMonth() - 1,
      dateToday.getDate()
    );

    const admins = await User.find({
      role: "admin",
    }).countDocuments();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
      totalUsers,
      admins,
    });
  } catch (error) {
    next(handleError(error));
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = await User.findById(id);
  if (currentUser.role != "admin" && id !== req.userId)
    next(handleError(403, "Unauthorized"));

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(handleError(error));
  }
};

export const getUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) return next(handleError(404, "User not found"));

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = await User.findById(id);

  if (id !== req.userId) next(handleError(403, "Unauthorized"));

  if (req.body.password != req.body.confirmPassword)
    return next(handleError(400, "Passwords do not match."));

  if (req.body.password.length < 6)
    return next(handleError(400, "Password must be at least 6 characters"));

  if (req.body.password.includes(" "))
    return next(handleError(400, "Password cannot contain spaces"));

  const samePassword = bcryptjs.compareSync(
    req.body.password,
    currentUser.password
  );

  if (samePassword)
    return next(handleError(400, "Password is same as the previous password."));

  req.body.password = bcryptjs.hashSync(req.body.password, 10);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...userData } = updatedUser._doc;

    res.status(200).json({
      success: true,
      message: "Password updated",
      data: userData,
    });
  } catch (error) {
    next(handleError(error));
  }
};

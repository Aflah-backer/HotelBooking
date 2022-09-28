import User from "../models/Users.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      // username: req.body.username,
      // email: req.body.email,
      ...req.body,
      password: hash,
    });

    await newUser.save();
    // if(!newUser) return next(createError(400,"something wrong"))
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

//LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(400, "user not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Worng password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details:{...otherDetails}, isAdmin });
  } catch (err) {
    next(err);
  }
};

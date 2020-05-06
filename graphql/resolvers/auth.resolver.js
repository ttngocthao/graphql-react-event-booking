const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");

module.exports = {
  createUser: async ({ args }) => {
    try {
      const user = await User.findOne({ email: args.email });
      if (user) {
        throw new Error("User is existed!");
      }

      const hashedPassword = await bcrypt.hash(args.password, 12);

      const newUser = new User({
        email: args.email,
        password: hashedPassword,
      });
      const result = await newUser.save();
      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User is not existed");
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        throw new Error("Password is not matched");
      }
      //when password matched, use jsonwebtoken package to return token to frontend
      const token = jwt.sign(
        { userId: user.id, eamil: user.email },
        "validationsecretkey",
        {
          expiresIn: "1h",
        }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    } catch (err) {
      throw err;
    }
  },
};

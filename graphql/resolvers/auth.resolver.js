const bcrypt = require("bcryptjs");
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
};

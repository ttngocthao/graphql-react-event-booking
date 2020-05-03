const bcrypt = require("bcryptjs");

const Event = require("../../models/event.model");
const User = require("../../models/user.model");
const events = async (eventIds) => {
  try {
    const events = await Event.find({
      _id: { $in: eventIds },
    });
    return events.map((event) => {
      return {
        ...event._doc,
        creator: user.bind(this, event._doc.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};
const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ args }) => {
    const newEvent = new Event({
      title: args.title,
      description: args.description,
      price: +args.price,
      date: new Date(args.date),
      creator: "5ead9ff98df92f38ec4660db",
    });
    let createdEvent;
    try {
      const result = await newEvent.save();
      createdEvent = {
        ...result._doc,
        creator: user.bind(this, result._doc.creator),
      };
      const creator = await User.findById("5ead9ff98df92f38ec4660db");
      if (!creator) {
        throw new Error("User cannot be found");
      }
      creator.createdEvents.push(newEvent);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  },
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

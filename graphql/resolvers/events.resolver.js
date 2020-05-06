const { dateToString } = require("../../helpers/date.helper");
const Event = require("../../models/event.model");
const User = require("../../models/user.model");
const { transformEvent } = require("./tools");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async ({ args }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const newEvent = new Event({
      title: args.title,
      description: args.description,
      price: +args.price,
      date: dateToString(args.date),
      creator: req.userId,
    });
    let createdEvent;

    try {
      const result = await newEvent.save();

      createdEvent = transformEvent(result);
      const creator = await User.findById(req.userId);
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
};

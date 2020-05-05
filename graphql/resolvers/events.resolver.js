const { dateToString } = require("../../helpers/date.helper");
const Event = require("../../models/event.model");
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

  createEvent: async ({ args }) => {
    const newEvent = new Event({
      title: args.title,
      description: args.description,
      price: +args.price,
      date: dateToString(args.date),
      creator: "5ead9ff98df92f38ec4660db",
    });
    let createdEvent;
    try {
      const result = await newEvent.save();
      createdEvent = transformEvent(result);
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
};

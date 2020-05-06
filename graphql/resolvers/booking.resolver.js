const Booking = require("../../models/booking.model");
const Event = require("../../models/event.model");
const { transformBooking, transformEvent } = require("./tools");
module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });

      if (!fetchedEvent) {
        throw new Error("Event cannot be found!");
      }
      const newBooking = new Booking({
        user: req.userId,
        event: fetchedEvent,
      });

      const result = await newBooking.save();

      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};

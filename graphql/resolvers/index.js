const authResolver = require("./auth.resolver");
const bookingResolver = require("./booking.resolver");
const eventResolver = require("./event.resolver");

const rootResolver = {
  ...authResolver,
  ...bookingResolver,
  ...eventResolver,
};

module.exports = rootResolver;

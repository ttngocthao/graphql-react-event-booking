const express = require("express");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Event = require("./models/event.model");
const User = require("./models/user.model");

const app = express();

const events = (eventIds) => {
  return Event.find({
    _id: { $in: eventIds },
  })
    .then((events) => {
      return events.map((event) => {
        return {
          ...event._doc,
          creator: user.bind(this, event._doc.creator),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};
const user = (userId) => {
  return User.findById(userId)
    .then((user) => {
      return {
        ...user._doc,
        createdEvents: events.bind(this, user._doc.createdEvents),
      };
    })
    .catch((err) => {
      throw err;
    });
};
app.use(express.json());

const PORT = process.env.PORT || 5000;

//this is the thing i always forgot :(
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
      }

      input UserInput{
        email: String!
        password: String!
      }

      type RootQuery {
        events: [Event!]!
      }
      type RootMutation{
        createEvent(args: EventInput): Event
        createUser(args: UserInput):User
      }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
  `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((events) => {
            return events.map((event) => {
              return {
                ...event._doc,
                creator: user.bind(this, event._doc.creator),
              };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createEvent: ({ args }) => {
        const newEvent = new Event({
          title: args.title,
          description: args.description,
          price: +args.price,
          date: new Date(args.date),
          creator: "5ead9ff98df92f38ec4660db",
        });
        let createdEvent;
        return newEvent
          .save()
          .then((result) => {
            createdEvent = { ...result._doc };
            return User.findById("5ead9ff98df92f38ec4660db");
          })
          .then((user) => {
            if (!user) {
              throw new Error("User cannot be found");
            }
            //update user database as this user create a new event
            user.createdEvents.push(newEvent);
            return user.save();
          })
          .then((result) => {
            return createdEvent;
          })
          .catch((err) => {
            console.log("error", err);
            throw err;
          });
      },
      createUser: ({ args }) => {
        return User.findOne({ email: args.email })
          .then((user) => {
            if (user) {
              throw new Error("User is existed!");
            }
            return bcrypt.hash(args.password, 12);
          })
          .then((hashedPassword) => {
            const newUser = new User({
              email: args.email,
              password: hashedPassword,
            });
            return newUser.save();
          })
          .then((result) => {
            return { ...result._doc, password: null };
          })
          .catch((err) => {
            throw err;
          });
      },
    },
    graphiql: true,
  })
);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ttnt-cluster-fmytw.mongodb.net/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `App is running at port ${PORT} and database is connected to ${process.env.MONGO_COLLECTION}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

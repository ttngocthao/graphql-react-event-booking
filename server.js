const express = require("express");
const graphqlHttp = require("express-graphql");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const mongoose = require("mongoose");
const isAuth = require("./middleware/isAuth");

const app = express();

app.use(express.json());
app.use(isAuth);

const PORT = process.env.PORT || 5000;

//this is the thing i always forgot :(
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
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

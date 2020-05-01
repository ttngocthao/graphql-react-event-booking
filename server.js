const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

//this is the thing i always forgot :(
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});

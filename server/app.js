const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const url = require("./ConnectionString");

const app = express();
app.use(cors());

mongoose.connect(url);

mongoose.connection.once("open", () => {
  console.log("connected to DB.");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log("Running on port: 4000");
});

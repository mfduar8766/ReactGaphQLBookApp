const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const url = require("./ConnectionString");
const path = require('path');

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

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('books-app/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'books-app', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log("Running on port: 4000");
});

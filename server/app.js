const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const url = require("./Config/ConnectionString");
const path = require('path');

const app = express();
app.use(cors());

mongoose.connect(url.mongoURI);

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

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('book-app/build'));
  app.get('*',(req,res) => {
    res.sendfile(path.resolve(__dirname, 'book-app', 'build', 'index.html'))
  });
}

app.listen(port, () => {
  console.log("Running on port: 4000");
});

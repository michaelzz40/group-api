const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
const db = require("./api/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({
    message: "This is an OK message"
  });
});

// Apply all the routes to the app
require("./api/routes/createGroupRoutes")(app);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

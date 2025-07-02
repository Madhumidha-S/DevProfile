const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
require("./config/passportConfig");

const routes = require("./routes");
const { errorHandler } = require("./middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "devprofile",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

// MAIN DEPENDENCIES
require("dotenv").config();
const express = require("express");

// MIDDLEWARE DEPENDENCIES
const cors = require("cors");
const { json } = require("body-parser");
const session = require("express-session");

// DATABASE DEPENDENCIES
const massive = require("massive");

// AUTHENTICATION DEPENDENCIES
// const passport = require("passport");
// const Auth0Strategy = require("passport-auth0");

// INITIALIZE APP
const app = express();

// CONNECT TO DATABASE
massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
    })
    .catch(console.log);

// SETUP MIDDLEWARES
app.use(cors());
app.use(json());

// LISTEN ON PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

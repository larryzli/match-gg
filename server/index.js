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
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

// IMPORT CONTROLLERS
const userController = require("./controllers/userController");
const bracketController = require("./controllers/bracketController");

// INITIALIZE APP
const app = express();

// SET ENVIRONMENTAL VARIABLES
const {
    AUTH_DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    REACT_APP_LOGIN
} = process.env;

// CONNECT TO DATABASE
massive(CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
    })
    .catch(console.log);

// SETUP MIDDLEWARES
app.use(cors());
app.use(json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

// SETUP AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new Auth0Strategy(
        {
            domain: AUTH_DOMAIN,
            clientSecret: CLIENT_SECRET,
            clientID: CLIENT_ID,
            callbackURL: "/auth",
            scope: "openid profile"
        },
        (accessToken, refreshToken, extraParams, profile, done) => {
            app
                .get("db")
                .get_user_id_by_auth_id(profile.id)
                .then(response => {
                    // If user does not exist then create user
                    if (!response[0]) {
                        let createdDate = new Date().toISOString();
                        app
                            .get("db")
                            .create_user([
                                profile.name.givenName,
                                profile.name.familyName,
                                profile.nickname,
                                profile.email,
                                profile.picture,
                                profile.id,
                                createdDate
                            ])
                            .then(created => {
                                console.log("New User: ", created);
                                return done(null, created[0]);
                            })
                            .catch(console.log);
                    } else {
                        // Else return existing user
                        console.log("Existing User: ", response);
                        return done(null, response[0]);
                    }
                })
                .catch(console.log);
        }
    )
);
passport.serializeUser((user_id, done) => done(null, user_id));
passport.deserializeUser((user_id, done) => done(null, user_id));

// LOGIN AUTHENTICATION API
app.get(
    "/auth",
    passport.authenticate("auth0", {
        successRedirect: "http://localhost:3000/dashboard",
        failureRedirect: REACT_APP_LOGIN
    })
);

// TEST API FOR USER SESSION
app.get("/api/me", (req, res) => {
    console.log("Session: ", req.user);
    if (req.user) {
        return res.status(200).json(req.user);
    } else {
        return res.redirect("/auth");
    }
});

// BRACKET API
app.post("/api/manage/brackets", bracketController.createBracket);
app.get("/api/manage/brackets", bracketController.getCreatorBrackets);

// LISTEN ON PORT
const port = PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

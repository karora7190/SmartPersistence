"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const express = require("express");
const compression = require("compression"); // compresses requests
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const lusca = require("lusca");
const dotenv = require("dotenv");
const mongo = require("connect-mongo");
const flash = require("express-flash");
const path = require("path");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const MongoStore = mongo(session);
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });
/**
 * Controllers (route handlers).
 */
const userController = require("./controllers/user");
const persistenceController = require("./controllers/persistenceController");
/**
 * Create Express server.
 */
const app = express();
/**
 * Connect to MongoDB.
 */
// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://smartperisitencedb:Yos6gwDNr3Vak1KBp3NLQIzDKeAtT9McyoveByHc9qoKNZpsu0zMcsmge3Hfm5H6GbkNK6gPwh4PynltO9neIA==@smartperisitencedb.documents.azure.com:10255/?ssl=true");
mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});
/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
//app.set("view engine", "pug");
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: process.env.SESSION_SECRET,
//   store: new MongoStore({
//     url: "mongodb://smartperisitencedb:Yos6gwDNr3Vak1KBp3NLQIzDKeAtT9McyoveByHc9qoKNZpsu0zMcsmge3Hfm5H6GbkNK6gPwh4PynltO9neIA==@smartperisitencedb.documents.azure.com:10255/?ssl=true",
//     autoReconnect: true
//   })
// }));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(express.static(path.join(__dirname, "views"), { maxAge: 31557600000 }));
/**
 * Primary app routes.
 */
app.post("/signup", userController.postSignup);
app.post("/saveSmartActions", persistenceController.savePersistenceModel);
app.post("/getSmartActions", persistenceController.getPersistenceModel);
/**
 * API examples routes.
 */
/**
 * OAuth authentication routes. (Sign in)
 */
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
module.exports = app;
//# sourceMappingURL=server.js.map
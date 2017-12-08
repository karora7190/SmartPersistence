/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";
import * as flash from "express-flash";
import * as path from "path";
import * as mongoose from "mongoose";
import * as cors from "cors";
import expressValidator = require("express-validator");



const MongoStore = mongo(session);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });


/**
 * Controllers (route handlers).
 */
import * as userController from "./controllers/user";
import * as persistenceController from "./controllers/persistenceController";


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
app.use(cors());
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
app.get("/loaderio-f077e1e710af6aec8b59d5f61dfe42d3.txt", function(req, res) {
  res.sendfile("./loaderio-f077e1e710af6aec8b59d5f61dfe42d3.txt");
});
app.post("/saveSmartActions",persistenceController.savePersistenceModel);
app.post("/getSmartActions",persistenceController.getPersistenceModel);

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

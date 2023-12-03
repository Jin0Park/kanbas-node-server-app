import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import session from "express-session";
import "dotenv/config";

import { createRequire } from 'module';
import "dotenv/config";
//import mongoose from "mongoose";
import UserRoutes from "./user/routes.js";

const require = createRequire(import.meta.url);
const mongoose = require('mongoose');
const url = 'mongodb+srv://teamfoodpilot:goodfood5610@foodpilot.efmu0r0.mongodb.net/kanbas?retryWrites=true&w=majority'
const connectionParams={
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ');
        console.log(mongoose.Connection);
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
app.use(
 cors({
   credentials: true,
    //origin: process.env.FRONTEND_URL
    origin: "https://shimmering-capybara-4a625a.netlify.app"
})
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  

CourseRoutes(app);
app.use(express.json());
ModuleRoutes(app);
UserRoutes(app);

Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
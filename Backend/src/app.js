import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import * as db from "./database.js";

const app = express();
app.use(
  cookieSession({
    secret: "cookiesecret",
  })
);
app.use(cookieParser());
app.use(cors());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const mongo = require('mongoose')
const User = require("./User")
const Post = require("./Post")
const database = require('./database.js')

mongo.connect("mongodb://localhost/appdb")
app.post("/api/SignUp", (req, res) => {
    const existUser = database.getUserbyUserName(req.body.user_name)
    if (existUser){
        res.status(400).send("Your Username already exists");
    }else{
        const user = database.addUser(req.body.nick_name,req.body.user_name,req.body.password,req.body.info)
        res.status(200).send("Sucessfully sign up!")
    }
});
app.post('./api/login',(req,res)=>{
    const user = database.getUserByUserNameAndPassword(req.body.user_name,req.body.password)
    if (user){
        req.session.user_name=req.body.user_name
        res.status(200).send(user)

    }else{
        res.status(400).send("At least one of your information is incorrect")
    }
});

app.post('./api/post')
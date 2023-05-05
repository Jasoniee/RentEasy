// import express from "express";
const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const cookieSession = require("cookie-session")
const bodyParser = require("body-parser")
const database = require("./database.js")
const mongo = require("mongoose")

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

mongo.connect("mongodb://localhost/appdb")
app.post("/api/signup", async (req, res) => {
    const existUser = await database.getUserbyUserName(req.body.user_name)
    if (existUser){
        res.status(400).send("The use name that you have entered has already exist");
    }else{
        const user = database.addUser(req.body.nick_name,req.body.user_name,req.body.password,req.body.info)
        res.status(200).send("Sucessfully sign up!")
    }
});

app.post('/api/login', async (req,res)=>{
    const user = await database.getUserByUserNameAndPassword(req.body.user_name,req.body.password)
    if (user.length){
        req.session.user_name=req.body.user_name
        res.status(200).send(user)
    }else{
        res.status(400).send("At least one of the information that you have entered is incorrect")
    }
});

// 发布个人post
app.post('/api/:user_name/post',async (req,res)=>{
    const posts = await database.addPost(req.params.user_name, req.body.start_date, req.body.end_date, req.body.price, req.body.description, req.body.email, req.body.city, req.body.state, req.body.zipCode)
    if (posts){
        res.status(200).send('Successfully posted')    }else{
            res.status(400).send('Please enter required information')
        }
});

// 个人界面的所有posts
app.get('/api/:user_name/posts')
// login 直接看到
app.get('/api/posts')

// 查看自己信息
app.get('/api/:user_name',async(req,res)=>{
    const user= await database.getUserbyUserName(req.params.user_name)
    if(user){
        res.status(200).send(user)
    }else{
        res.status(400).send('something went wrong')
    }
});

// 删除指定post
app.delete('/api/:user_name/:')





module.exports = app;

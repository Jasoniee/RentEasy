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
        res.status(400).send(existUser);
    }else{
        const user = database.addUser(req.body.nick_name,req.body.user_name,req.body.password,req.body.info)
        res.status(200).send("Sucessfully sign up!")
    }
});

app.post('/api/login', async (req,res)=>{
    const user = await database.getUserByUserNameAndPassword(req.body.user_name,req.body.password)
    if (user){
        req.session.user_name=req.body.user_name
        res.status(200).send(user)
    }else{
        res.status(400).send("At least one of the information that you have entered is incorrect")
    }
});
app.get("/api/user",(req,res)=>{
    if (!req.session.user_name){
        res.status(402).send('missing')
        return
    }
    const user_name = req.session.user_name
    res.status(200).send({user_name:user_name})
});
// post post
app.post('/api/:user_name/post',async (req,res)=>{
    const post = await database.addPost(req.params.user_name, req.body.start_date, req.body.end_date, req.body.price, req.body.description, req.body.email, req.body.city, req.body.state, req.body.zipCode)
    console.log(post)
    if (post){
        res.status(200).send('Successfully posted')    
    } else {
          res.status(400).send('Please enter required information')
      } 
});

// get all posts of the user
app.get('/api/:user_name/posts', async (req, res) => {
  const posts = await database.getPostsByUserName(req.params.user_name)
  res.status(200).send(posts)
})

// logout 
app.get("/api/logout", (req, res) => {
  req.session = null;
  res.status(200).send();
});


// return all the posts by location
app.get('/api/posts', async (req,res)=>{
    const posts = await database.getPostByLocation(req.body.city)
    if (posts.length > 0){
        res.status(200).send(posts)
    }else{
        res.status(400).send("No post found")
    }
});

//get user's info
// app.get('/api/:user_name',async(req,res)=>{
//     const user= await database.getUserbyUserName(req.params.user_name)
//     if(user){
//         res.status(200).send(user)
//     }else{
//         res.status(400).send('something went wrong hihi')
//     }
// });

// delete post by the given id
app.delete('/api/:user_name/:', async(req, res) => {
  const post = database.getPostById(req.body.post_id);
  if (post) {
    await database.deletePostById(req.body.post_id)
    res.status(200).send(post)
  } else {
    res.status(400).send("we can't find this post")
  }
  
})

// 1 test
app.get('/api/getAllUsers', async(req, res) => {
  res.status(200).send(await database.getAllUsers())
})



module.exports = app;

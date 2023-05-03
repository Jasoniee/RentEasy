const mongo = require('mongoose')
const User = require("./User")
const Post = require("./Post")

mongo.connect("mongodb://localhost/appdb")

const addUser = async()=>{
    
}
const addPost=async(start_date, end_date, price, description,email)=>{
    const post = await Post.create({
        start_date:start_date,
        end_date: end_date,
        price:price,
        description:description,
        email:email
    })
}
module.exports={
    addUser,
    addPost
}


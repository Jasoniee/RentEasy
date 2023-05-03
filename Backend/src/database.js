// npm run devStart

const mongo = require('mongoose')
const User = require("./User")
const Post = require("./Post")

mongo.connect("mongodb://localhost/appdb")


const addPost = async(start_date, end_date, price, description,email,city,state,zipCode)=>{
    const post = await Post.create({
        start_date:start_date,
        end_date: end_date,
        price:price,
        description:description,
        email:email,
        city:city,
        state:state,
        zipCode:zipCode

    })}


const addUser = async (nick_name, user_name, password, info) => {
    try {
        const user = await User.create({
            nick_name: nick_name,
            user_name: user_name,
            password: password,
            info: info,
            }
        )
    } catch(e) {
            console.log(e.message)
    }
}


// yh792
const getPostById = async(post_id) => {
    try{
        const post = await Post.findById(post_id)
        console.log(post)

        return post
    }
    catch(e){
        console.log(e.message)
    }
}

// qny2
const getUserByUserNameAndPassword = async() => {

}

// yh792
const getPostByLocation = async(city) => {
    try{
        const post = await Post.find({location:city})
        return post
    }
    catch(e){
        console.log(e.message)
    }
}

// tz275
const deletePost = async() => {

}

module.exports = {
    addUser,
    addPost
}

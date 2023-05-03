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


module.exports = {
    addUser,
    addPost
}
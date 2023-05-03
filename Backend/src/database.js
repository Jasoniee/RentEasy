const mongo = require('mongoose')
const User = require("./User")
const Post = require("./Post")

mongo.connect("mongodb://localhost/appdb")

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

const addPost = () => {

}


module.exports = {
    addUser,
}
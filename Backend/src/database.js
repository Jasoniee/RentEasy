const mongo = require('mongoose')
const User = require("./User")
const Post = require("./Post")

mongo.connect("mongodb://localhost/appdb")

export const addUser = async (nick_name, user_name, password, nick_name, info) => {
    const user = await User.create({
        nick_name: nick_name,
        user_name: user_name,
        password: password,
        info: info,
    })
}
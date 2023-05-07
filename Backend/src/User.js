//const mongo = require('mongoose')
import mongo from 'mongoose'
const userSchema = new mongo.Schema({
    nick_name: {type: String, required: true},
    user_name: {type: String, required: true},
    password: {type: String, required: true},
    posts: [mongo.SchemaTypes.ObjectId],
    info: String,
})

module.exports = mongo.model("User", userSchema)
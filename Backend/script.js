const mongo = require('mongoose')

mongo.connect("mongodb://localhost/appdb")

const postSchema = new mongo.Schema({
    start_date: Date,
    end_date: Date,
    price: Number,
    description: String,
    img_urls: [String],
})

const userSchema = new mongo.Schema({
    nick_name: String,
    user_name: String,
    password: String,
    posts: [mongo.SchemaTypes.ObjectId],
    info: String,
})

 
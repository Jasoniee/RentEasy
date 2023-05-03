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
        return user
    } catch(e) {
            console.log(e.message)
    }
}

// yh792
const getPostById = async() => {

}

// qny2
const getUserByUserNameAndPassword = async() => {

}

// yh792
const getPostByLocation = async() => {

}

// tz275
const deletePost = async(id) => {
    await User.deleteOne({_id: id})
}

// test function
async function testFunction() {
    console.log(addUser('Zztk', 'xxx', '12345', 'hi'))
    console.log(await User.find())
    await User.deleteMany({nick_name: 'Zztk'})
    console.log("\n" + await User.find() + "Finished")
}

testFunction()

module.exports = {
    addUser,
    addPost
}
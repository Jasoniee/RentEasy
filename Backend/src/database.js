// npm run devStart

const mongo = require('mongoose')
const User = require("./User")
const Post = require("./Post")

mongo.connect("mongodb://localhost/appdb")
//mongo.connect()

const addPost = async(start_date, end_date, price, description,email,city,state,zipCode)=>{
    const post = await Post.create({
        start_date:start_date,
        end_date: end_date,
        price:price,
        description:description,
        email:email,
        location: {
            city: city,
            state: state,
            zipCode: zipCode,
          },

    })
    return post
}


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
const getUserByUserNameAndPassword = async(username,password) => {
    try{
        const user = await User.find({username:username, password:password})
        return user
    }
    catch(e){
        console.log(e.message)
    }
}
const getUserbyUserName=async(username)=>{
    try{
        const user =  await User.find({username:username})
        return user
    }
    catch(e){
        console.log(e.message)
    }
}

// yh792
const getPostByLocation = async(city) => {
    try{
        const post = await Post.find({'location.city': city})
        //console.log(post)
        return post
    }
    catch(e){
        console.log(e.message)
    }
}

// tz275
const deletePost = async(id) => {
    try {
        await User.deleteOne({_id: id})
    } catch (e) {
        console.log(e.message)
    }
}

// test function
async function testFunction() {
    console.log(addUser('Zztk', 'xxx', '12345', 'hi'))
    //console.log("hi")
    console.log(addPost(new Date('2023-05-10'), new Date('2023-05-20'), 100, 'This is a sample post', 'example@example.com', 'San Francisco', 'California', 12345))
    //console.log(await Post.find())
    //console.log('ok')
    console.log(await getPostByLocation('San Francisco'))
    //console.log(User)
    //console.log(await User.find())
    //console.log(await Post.find())
    await User.deleteMany({nick_name: 'Zztk'})
    await Post.deleteMany({'location.city': 'San Francisco'})
    console.log("\n" + await User.find() + "Finished")
    console.log("\n" + await Post.find() + "Finished")
}

//testFunction()


module.exports = {
    addUser,
    addPost,
    getPostById,
    getUserByUserNameAndPassword,
    getUserbyUserName,
    getPostByLocation,
    deletePost,


}

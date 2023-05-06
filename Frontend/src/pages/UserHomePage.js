import React, { useEffect, useState } from "react";
import ListClasses from "../components/ListPosts";
import CreatePost from "../components/CreatePost";

/**
 * CS-5356-TODO
 * Show classes on the User Home Page
 *
 * When this component loads for the first time,
 * load the users classes with a GET /api/classes.
 * Save it to the component state.
 *
 * Users can create new class codes, and classes from this page.
 * When a class code is generated or a new class is created,
 * reload and display the updated list of the user's classes.
 */
const UserHomePage = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("Get the posts on home page");
    fetch(`/api/${props.user_name.toString()}/post`).then(response =>{
      if (response.ok){
        response.json().then(data=>{
          setPosts(data.posts)
        })
      }
    })
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <ListClasses classes= {classes} onCodeGenerated={onCodeGenerated} />
        </div>
      </section>
      <section>
        <div className="container">
          <CreatePost onPostCreated={onPostCreated} />
        </div>
      </section>
    </>
  );
};

export default UserHomePage;

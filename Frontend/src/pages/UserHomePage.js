import React, { useEffect, useState } from "react";


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
    fetch(`/api/${props.user_name.user_name.toString()}/posts`).then(response =>{
      if (response.ok){
        response.json().then(data=>{
          setPosts(data)
        })
      }
    })
  }, []);

  return (
    <>
     <section className="hero">
      <div class="container is-max-desktop" style={{marginTop: '3rem'}}>
      </div>
      <div>
        <p>
          ~~~
        </p>
      </div>

          <div className="post-list" class="columns is-desktop" >
    {posts && posts.map(post => (
      <div key={post._id} class="column is-primary"style={{backgroundColor: '#4FFFB0'}} >
        <h2 className="title is-4">{post.user_name}</h2>
        <p><strong>Start date:</strong> {post.start_date}</p >
        <p><strong>End date:</strong> {post.end_date}</p >
        <p><strong>Price:</strong> {post.price}</p >
        <p><strong>Description:</strong> {post.description}</p >
        <p><strong>Email:</strong> {post.email}</p >
        <p><strong>City:</strong> {post.location.city}</p >
        <p><strong>State:</strong> {post.location.state}</p >
        <p><strong>Zip Code:</strong> {post.location.zipCode}</p >
      </div>
    ))}
  </div>

      
    </section>
    </>
  );
};

export default UserHomePage;

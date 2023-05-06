import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

/**
 *
 * CS-5356-TODO Login Page
 *
 * We're going to use a "mock" login system, so
 * all we need the user to provide is a username.
 *
 * Once they've filled in the username, they should
 * click Submit, at which point, we log the user in and
 * redirect them
 */
const PostsPage = props => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {

    fetch('/api/posts').then(response =>{
      if (response.ok){
        response.json().then(data=>{
          setPosts(data.posts)
        })
      }
    })
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    /**
     * CS-5356-TODO
     *
     * Log the user in. Grab the value from the username input element
     * and send it in an object to POST /api/login
     *
     * When it responds with a 200 OK, call `props.onLogin()` to have App
     * update your sign-in status, and then call `navigate('/instructor-home')`
     * to go to the /instructor-home page
     */
    fetch('/api/posts',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({city: e.target.city.value})
    }).then(response =>{
      if(response.ok){
        navigate('/login', {replace: true});
      }else{
        console.log('sign up wrong')
      }
    })
  };
  return (
    <section className="hero">
      <div  class="container is-max-desktop" style={{marginTop: '3rem'}}>
        <form onSubmit={handleSubmit} >
         
          <label className="label" htmlFor="city">
            Show me the city you want
          </label>
          <input name = "city" className='input' />
          <div><input type="submit" className='button is-primary'/></div>
        </form>
      </div>
    </section>
  );
};

export default PostsPage;

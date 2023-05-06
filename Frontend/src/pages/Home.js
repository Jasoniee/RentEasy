import React from "react";
import { Link } from "react-router-dom";

const Home = props => {

  return (
    <>
      <section className="hero is-small">
        <div className="container hero-body">
          <p className="title">Welcome to RentEasy</p>
          <p className="subtitle">Please sign up first</p>
        </div>
      </section>
      <section className="hero is-small ">
        <div className="container hero-body">
          <Link to="/signup" className="button is-primary is-large">
            Sign Up
          </Link>
          <Link to="/login" className="button is-primary is-large">
            Sign in
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;

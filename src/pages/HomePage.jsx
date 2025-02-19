import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import Testimonials from "../components/Testimonials/Testimonial";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="home">
        <div className="home-content mt-5">
          <h1>Hi! Welocome to our Online Learning Platform (OLP)</h1>
          <p>
            We are here to grow your career, Your career is a journey, not a
            destination. Enjoy every step along the way.{" "}
          </p>
          <button
            onClick={() => {
              navigate("/courses");
            }}
            className="btn btn-primary common-btn"
          >
            Get Started
          </button>
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default HomePage;

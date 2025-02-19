import React, { useContext } from "react";
import "./courseCard.css";
import { server } from "../../main";
import { CourseContext } from "../../context/CourseContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const { user, isAuth } = useContext(AuthContext);
  const { fetchCourses } = useContext(CourseContext);

  const deleteHandler = async (id) => {
    if (confirm("Ary you sure, you don't want this couse? ")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        toast.success(data.massage);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.massage);
      }
    }
  };

  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt="" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor - {course.createdBy}</p>
      <p>Duration - {course.duration} weeks</p>
      {isAuth ? (
        <>
          {user?.role !== "admin" && user?.role !== "Instructor" ? (
            <button
              onClick={() => navigate(`/course/${course._id}`)}
              className="common-btn"
            >
              Get Started Study
            </button>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn mx-2">
          Get Started
        </button>
      )}

      {(user?.role === "admin" || user?.role === "Instructor") && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn mx-2"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;

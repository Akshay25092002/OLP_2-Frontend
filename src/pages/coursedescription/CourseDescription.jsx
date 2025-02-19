import React, { useContext, useEffect } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseContext } from "../../context/CourseContext";
import { server } from "../../main";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const { fetchCourse, course } = useContext(CourseContext);

  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  //console.log(params.id);
  return (
    <>
      {course && (
        <div className="course-description">
          <div className="course-header">
            <img
              src={`${server}/${course.image}`}
              alt=""
              className="course-image"
            />
            <div className="course-info">
              <h2>{course.title}</h2>
              <p>Instructor: {course.createdBy}</p>
              <p>Duration: {course.duration} weeks</p>
            </div>
          </div>
          <p>Let's get started.</p>
          <button
            onClick={() => navigate(`/course/study/${course._id}`)}
            className="common-btn"
          >
            Study
          </button>
        </div>
      )}
    </>
  );
};

export default CourseDescription;

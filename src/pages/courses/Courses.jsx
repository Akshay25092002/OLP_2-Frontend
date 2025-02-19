import React, { useContext } from "react";
import "./courses.css";
import { CourseContext } from "../../context/CourseContext";
import CourseCard from "./../../components/CourseCard/CourseCard";

const Courses = () => {
  const { courses } = useContext(CourseContext);

  console.log(courses);
  return (
    <div className="courses">
      <h2>Available Courses</h2>

      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Course Available!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;

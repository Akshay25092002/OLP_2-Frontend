import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}!</h1>
      <h3>Role: {user?.role}</h3>

      {user?.role === "instructor" ? (
        <div className="instructor-panel">
          <h2>Instructor Panel</h2>
          <button onClick={() => console.log("Create Course")}>
            Create New Course
          </button>
          <button onClick={() => console.log("Manage Courses")}>
            Manage Courses
          </button>
        </div>
      ) : (
        <div className="student-panel">
          <h2>Student Panel</h2>
          <button onClick={() => console.log("View Enrolled Courses")}>
            My Courses
          </button>
          <button onClick={() => console.log("Explore Courses")}>
            Explore Courses
          </button>
        </div>
      )}

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;

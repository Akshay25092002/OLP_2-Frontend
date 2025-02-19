import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = useContext(AuthContext);
  const { fetchMyCourse } = useContext(CourseContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(formData.email, formData.password, navigate, fetchMyCourse);
  };

  return (
    <div className="container mt-2">
      ``
      <h2 className="my-2">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            autoComplete="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            minLength={5}
            autoComplete="current-password"
            required
          />
        </div>
        <button disabled={btnLoading} type="submit" className="btn btn-primary">
          {btnLoading ? "Please wait" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

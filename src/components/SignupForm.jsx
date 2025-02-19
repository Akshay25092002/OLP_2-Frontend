import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(
      formData.name,
      formData.email,
      formData.password,
      formData.role,
      navigate
    );
  };

  return (
    <div className="container mt-2">
      ``
      <h2 className="my-2">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            autoComplete="name"
            minLength={3}
            aria-describedby="nameHelp"
          />
        </div>
        <div className="mb-3">
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
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <label className="form-label fw-bold fs-6 text-dark">
            Are you Join as:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select fw-semibold fs-6 mt-2"
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </label>
        </div>

        <button type="submit" disabled={btnLoading} className="btn btn-primary">
          {btnLoading ? "Please Wait." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

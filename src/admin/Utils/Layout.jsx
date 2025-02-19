import React from "react";
import Sidebar from "./Sidebar";
import "./same.css";

const Layout = ({ children }) => {
  return (
    <div className="dashboard-admin">
      <Sidebar />

      <div className="content mx-2">{children}</div>
    </div>
  );
};

export default Layout;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = document.getElementById("admin-user").value;
      const pass = document.getElementById("pass").value;
      if (user === "" || pass === "") {
        alert("Please fill all the fields");
        return;
      }
      const response = await fetch(
        "https://backend-acasync.vercel.app/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user, password: pass }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.message === "Admin not found") {
        alert("Admin not found");
        return;
      } else {
        console.log("Admin logged in successfully");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="admin-login">
      <div className="back">
        <h1 id="admin-back">Acasync</h1>
      </div>
      <form className="admin-form" id="admin-form" onSubmit={handleFormSubmit}>
        <label htmlFor="login">
          <h1 className="text-2xl">Admin Login</h1>
        </label>
        <label htmlFor="admin-user">User ID</label>
        <input type="text" id="admin-user" name="userId" />
        <label htmlFor="pass">Password</label>
        <input type="password" id="pass" name="password" />
        <input type="submit" value="Login" />
        <div className="flex flex-row justify-around">
          <Link to="/admin/signup">
            <h3>Not Registered?</h3>
          </Link>
          <Link to="/student/login">
            <button className="student-switch">Switch to Student</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Admin;

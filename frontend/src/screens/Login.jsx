// All the details are mentioned in comments in Signup.jsx file.

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://react-app-brvd.onrender.com/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const jsonVal = await response.json();
    // console.log(jsonVal);
    if (!jsonVal.success) {
      alert("Enter Valid Credentials");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", jsonVal.authToken);
      navigate("/");
    }
  };

  function handleChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form
          className="w-50 mt-5 bg-dark rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label fs-3">Email address</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              className="form-control"
              // placeholder="Enter email"
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label fs-3 mt-3">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              className="form-control"
              // placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger">
            Create an Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

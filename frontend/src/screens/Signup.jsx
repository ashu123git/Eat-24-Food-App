import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate is used to navigate to other page from one page that is from login to signup, etc.
import Navbar from "../components/Navbar";

function Signup() {
  const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", location: ""})

  // Below function is used to connect front-end with backend. Fetch API is used so that whenever Submit button is pressed, it will hit the below endpoint
  const handleSubmit = async(event)=>{
    event.preventDefault();
    const response = await fetch("https://react-app-brvd.onrender.com/createuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location})
    });

    const jsonVal = await response.json();
    // console.log(jsonVal);
    if(!jsonVal.success) {
      alert("Enter Valid Credentials !!");
    }
    else {
      navigate("/login");
    }
  }

  function handleChange(event) {
    setCredentials({...credentials, [event.target.name]:event.target.value});
  }


  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputName" className="form-label fs-3">Name</label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              className="form-control"
              // placeholder="Enter name"
              onChange={handleChange}
            />
          </div>
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
            <label htmlFor="exampleInputPassword1" className="form-label fs-3">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              className="form-control"
              // placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputLocation" className="form-label fs-3">Location</label>
            <input
              type="text"
              name="location"
              value={credentials.location}
              className="form-control"
              // placeholder="Enter Location"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a User ?</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;

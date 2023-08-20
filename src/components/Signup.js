import React, { useContext, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const host = "http://localhost:5000";
  const [loginCred, setLoginCred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const alertContext = useContext(AlertContext);
  const { setMessage, setMsgType } = alertContext;
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = loginCred;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      setMsgType("success");
      setMessage("Signup successful");
      navigate("/login");
    } else {
      setMsgType("danger");
      setMessage("Signup Error");
    }
  };

  const handleChange = (e) => {
    setMessage("");
    setLoginCred({ ...loginCred, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-3">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="name"
            onChange={handleChange}
            minLength={3}
            required
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
            aria-describedby="email"
            onChange={handleChange}
            required
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
            minLength={4}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={handleChange}
            minLength={4}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

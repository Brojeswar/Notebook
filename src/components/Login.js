import React, { useContext, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const host = "http://localhost:5000";
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });
  const alertContext = useContext(AlertContext);
  const { setMessage, setMsgType } = alertContext;
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCred),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      setMsgType("success");
      setMessage("Loggedin successfully");
      navigate("/");
    } else {
      setMsgType("danger");
      setMessage("Invalid credentials");
    }
  };

  const handleChange = (e) => {
    setMessage("");
    setLoginCred({ ...loginCred, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-3">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
            value={loginCred.email}
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
            value={loginCred.password}
            onChange={handleChange}
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

export default Login;

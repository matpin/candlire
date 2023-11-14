import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import Button from "@mui/material/Button";
import logo from "../../src/signInUpImage2.jpg";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handles sign in action
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await axios
        .post(`http://localhost:8000/signin`, {
          username,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            alert(res.data.msg);
            localStorage.setItem("token", res.data.token);
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        alert("Internal error");
      }
    }
  }

  return (
    <div className="signInContainer">
      <div className="signInLeftSide">
        <img className="signInUpImage" src={logo} alt="signInUpImage" />
      </div>
      <div className="signInRightSide">
        <h1 className="signInTitle">Sign in to Candlire</h1>
        <form className="formContainer">
          <div className="signInUsernamePassword">
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              spellCheck={false}
              className="signInInput"
            />
          </div>
          <div className="signInUsernamePassword">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="signInInput"
            />
          </div>
          <Button
            onClick={handleSignIn}
            size="medium"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "50px",
              height: "5vh"
            }}
            variant="filled"
          >
            Sign In
          </Button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;

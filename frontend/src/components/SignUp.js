import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import "./SignUp.css";
import logo from "../../src/signInUpImage.jpg";
import Button from "@mui/material/Button";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Handles sign up action
  async function handleSignUp(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await axios
        .post(`http://localhost:8000/signup`, {
          username,
          email,
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
    }
  }

  return (
    <div className="signUpContainer">
      <div className="signUpLeftSide">
        <img className="signInUpImage" src={logo} alt="signInUpImage" />
      </div>
      <div className="signUpRightSide">
        <h2 className="signUpTitle">Sign up to Candlire</h2>
        <form className="signUpFormContainer">
          <div className="signUpUsernamePassword">
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              spellCheck={false}
              className="signUpInput"
            />
          </div>
          <div className="signUpUsernamePassword">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              spellCheck={false}
              className="signUpInput"
            />
          </div>
          <div className="signUpUsernamePassword">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="signUpInput"
            />
          </div>
          <div className="signUpUsernamePassword">
            <label>Confirm Password</label>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="signUpInput"
            />
            {password !== confirmPassword ? (
              <Alert severity="error">Passwords does not match</Alert>
            ) : (
              ""
            )}
          </div>
          <Button
            onClick={handleSignUp}
            size="medium"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "50px",
              height: "5vh",
            }}
            variant="filled"
          >
            Create Account
          </Button>
        </form>
        <p className="existedAccount">
          Already have an account?{" "}
          <Link className="signInLink" to="/signin">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

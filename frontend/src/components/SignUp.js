import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      <h2>Sign up to Candlire</h2>
      <form>
        <div>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            spellCheck={false}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            spellCheck={false}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {password !== confirmPassword ? (
            <p>Passwords does not match</p>
          ) : ("")} 
        </div>
        <button onClick={handleSignUp}>Create Account</button>
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      </form>
    </div>
  );
}

export default SignUp;

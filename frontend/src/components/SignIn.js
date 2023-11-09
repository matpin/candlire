import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
      }
    }
  
    return (
      <div>
        <h2>Sign in to Candlire</h2>
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
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button onClick={handleSignIn}>Sign In</button>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    );
  }

export default SignIn
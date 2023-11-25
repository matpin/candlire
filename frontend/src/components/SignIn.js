import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import Button from "@mui/material/Button";
import logo from "../../src/signInUpImage2.jpg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState("");
  const [emptyPassword, setEmptyPassword] = useState("");
  const [userNotFound, setUserNotFound] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handles dialog when user sign up successfully
  function handleSignInDialog() {
    navigate("/");
  }

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
            localStorage.setItem("token", res.data.token);
            setOpenSignInDialog(true);
          }
        });
    } catch (error) {
      console.log(error);
      if (error.response.data.username === "") {
        setEmptyUsername(error.response.data.msg);
      }
      if (error.response.data.password === "") {
        setEmptyPassword(error.response.data.msg);
      }
      if (!error.response.data.userFound && error.response.data.userFound !== undefined) {
        setUserNotFound(error.response.data.msg);
      } 
      if (!error.response.data.validPass && error.response.data.validPass !== undefined) {
          setIncorrectPassword(error.response.data.msg);
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
              onChange={(e) => {setUsername(e.target.value); setEmptyUsername(""); setUserNotFound("");}}
              value={username}
              spellCheck={false}
              className="signInInput"
            />
             {emptyUsername !== "" ? (
              <Alert style={{ fontFamily: "Lora" }} severity="error">{emptyUsername}</Alert>
            ) : ("")}
            {userNotFound !== "" ? (
              <Alert style={{ fontFamily: "Lora", fontSize: "0.8em" }} severity="error">{userNotFound}</Alert>
            ) : ("")}
          </div>
          <div className="signInUsernamePassword">
            <label>Password</label>
            <div className="signInPassInputContainer">
              {showPassword ? (
                <>
                 <input
              type="text"
              onChange={(e) => {setPassword(e.target.value); setEmptyPassword(""); setIncorrectPassword("");}}
              value={password}
              className="signInPassInput"
            />
            <VisibilityOffIcon style={{marginRight: "0.4em", color: "gray"}} onClick={() => setShowPassword(false)} />
                </>
              ) : (
                <>
                 <input
              type="password"
              onChange={(e) => {setPassword(e.target.value); setEmptyPassword(""); setIncorrectPassword("");}}
              value={password}
              className="signInPassInput"
            />
            <VisibilityIcon style={{marginRight: "0.4em", color: "gray"}} onClick={() => setShowPassword(true)} />
                </>
              )}
            </div>
             {emptyPassword !== "" ? (
              <Alert style={{ fontFamily: "Lora" }} severity="error">{emptyPassword}</Alert>
            ) : ("")}
            {incorrectPassword !== "" ? (
              <Alert style={{ fontFamily: "Lora" }} severity="error">{incorrectPassword}</Alert>
            ) : ("")}
          </div>
          <Button
            onClick={handleSignIn}
            size="medium"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "50px",
              height: "5vh",
              fontFamily: "Lora",
              textTransform: "capitalize",
              fontSize: "1em",
            }}
            variant="filled"
          >
            Sign In
          </Button>
        </form>
        <p className="notAccount">
          Don't have an account?{" "}
          <Link className="signUpLink" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>

      <Dialog
        open={openSignInDialog}
        onClose={handleSignInDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ fontFamily: "Lora" }} id="alert-dialog-title">
          Welcome back!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ fontFamily: "Lora" }}
            id="alert-dialog-description"
          >
            Sign in successful!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ fontFamily: "Lora", color: "#333" }}
            onClick={() => handleSignInDialog(true)}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignIn;

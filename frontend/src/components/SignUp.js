import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import "./SignUp.css";
import logo from "../../src/signInUpImage.jpg";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [emptyUsername, setEmptyUsername] = useState("");
  const [emptyEmail, setEmptyEmail] = useState("");
  const [emptyPassword, setEmptyPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState(true);
  let validateEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);

  // Handles dialog when user sign up successfully
  function handleSignUpDialog() {
    navigate("/");
  }

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
            localStorage.setItem("token", res.data.token);
            setOpenSignUpDialog(true);
          }
        });
    } catch (error) {
      console.log(error);
      if (error.response.data.username === "") {
        setEmptyUsername(error.response.data.msg);
      }
      if (error.response.data.email === "") {
        setEmptyEmail(error.response.data.msg);
      }
      if (error.response.data.password === "") {
        setEmptyPassword(error.response.data.msg);
      }
      if (error.response.data.emailFound === null) {
        setErrorUsername(error.response.data.msg);
      } else if (error.response.data.usernameFound === null) {
        setErrorEmail(error.response.data.msg);
      }
      setEmailValidation(validateEmail);
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
              onChange={(e) => {setUsername(e.target.value); setErrorUsername(""); setEmptyUsername("");}}
              value={username}
              spellCheck={false}
              className="signUpInput"
              minLength="4"
            />
            {errorUsername !== "" ? (
              <Alert severity="error">{errorUsername}</Alert>
            ) : ("")}
            {emptyUsername !== "" ? (
              <Alert severity="error">{emptyUsername}</Alert>
            ) : ("")}
            {username.length < 4 && username !== "" ? (
              <Alert severity="error">Username has to be greater than 4 characters</Alert>
            ) : ("")}
          </div>
          <div className="signUpUsernamePassword">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => {setEmail(e.target.value); setErrorEmail(""); setEmptyEmail(""); setEmailValidation(true);}}
              value={email}
              spellCheck={false}
              className="signUpInput"
            />
            {errorEmail !== "" ? (
              <Alert severity="error">{errorEmail}</Alert>
            ) : ("")}
            {emptyEmail !== "" ? (
              <Alert severity="error">{emptyEmail}</Alert>
            ) : ("")}
            {!emailValidation ? (
              <Alert severity="error">Invalid email address</Alert>
            ) : ("")}
          </div>
          <div className="signUpUsernamePassword">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => {setPassword(e.target.value); setEmptyPassword("");}}
              value={password}
              className="signUpInput"
            />
             {emptyPassword !== "" ? (
              <Alert severity="error">{emptyPassword}</Alert>
            ) : ("")}
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
              fontFamily: "Lora"
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

      <Dialog
        open={openSignUpDialog}
        onClose={handleSignUpDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{fontFamily: "Lora"}} id="alert-dialog-title">
          Welcome
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontFamily: "Lora"}} id="alert-dialog-description">
            Sign up successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{fontFamily: "Lora", color: "#333"}} onClick={() => handleSignUpDialog(true)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignUp;

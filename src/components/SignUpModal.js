import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
  },
  footer: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5), 
  },
  header: {
    paddingLeft: theme.spacing(6),
  }
}));

const SignUpModal = ({className,show,toggle,toggleShow,signUpUser}) => {
  const classes = useStyles();
  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email:"",
    username:"",
    password:""
  })
  const { username,email,password } = userInfo
  
  const handleInput = (e) => {
    if (e.target.name === "username"){
      let x = { ...e };
      let newDelay = setTimeout(() => handleUsernameCheck(x), 500);
      setDelay(newDelay);
    }
    if (e.target.name === "email"){
      setEmailValid(e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
    }
    if (e.target.name === "password"){
      setPasswordValid(e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    }
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    })
  }
  const handleUsernameCheck = e => {
    const newUsername = e.target.value;
    if (newUsername.length >= 6) {
      axios
        .get(
          `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
        )
        .then(response => {
          if (response.data.valid) {
            setUsernameValid(true);
          } else {
            setUsernameValid(false);
          }
        });
    }
  };
  const handleSignUp = (e) =>{
    e.preventDefault()
    signUpUser(username,email,password)
    setTimeout(toggleShow,1000);
  }
  return (
    <div>
      <Modal isOpen={show} toggle={toggleShow} className={className}>
        <ModalHeader className={classes.header} toggle={toggleShow}>Sign Up</ModalHeader>
        <ModalBody>
          <Form className={classes.root} onSubmit={handleSignUp}>
            <FormGroup>
              <TextField label="Username" fullWidth name="username" type="text" value={username} 
                onChange={e => {
                  if (delay) {
                    clearTimeout(delay);
                  }
                  handleInput(e);
                }}
                {...(username.length >= 6
                  ? usernameValid
                    ? { error: false }
                    : { error: true }
                  : username.length > 0
                  ? { error: true }
                  : "")}
                helperText={(username.length >= 6
                  ? usernameValid
                    ? "Sweet, this username is available!"
                    : "Sorry, this username is taken!"
                  : username.length > 0
                    ? "Must be minimum 6 characters"
                    : "")}
              />
            </FormGroup>
            <FormGroup>
              <TextField label="Email" fullWidth name="email" type="email" value={email} onChange={handleInput}
                {...(emailValid
                  ? { error: false }
                  : email.length > 0
                    ? { error: true }
                    : "")}
                helperText={(email.length > 0
                  ? emailValid
                    ? "Sweet, this email is valid!"
                    : "Sorry, invalid email"
                  : "")}
              />
            </FormGroup>
            <FormGroup>
            <TextField label="Password" fullWidth name="password" type="password" value={password} onChange={handleInput}
              {...(password.length >= 6
                ? passwordValid
                  ? { error: false }
                  : { error: true }
                : password.length > 0
                ? { error: true }
                : "")}
                helperText={(password.length >= 7
                  ? passwordValid
                    ? "Sweet, this password is valid!"
                    : "Sorry, this password is invalid!"
                  : password.length > 0
                    ? "Must be minimum 8 characters"
                    : "")}
              />
            </FormGroup>
            <input type="submit" className="d-none" />
          </Form>
        </ModalBody>
        <ModalFooter className={classes.footer}>
          <Button outline color="success" disabled={!(usernameValid && emailValid && passwordValid)} onClick={handleSignUp}>Sign Up</Button>{' '}
          <Button outline color="primary" onClick={toggle}>Login now</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SignUpModal;
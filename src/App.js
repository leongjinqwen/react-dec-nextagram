import React, { useState, useEffect } from "react"
import axios from 'axios'
import LoadingIndicator from "./components/LoadingIndicator";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import NavBar from "./components/NavBar";
import MyProfilePage from "./pages/MyProfilePage"
import UploadPage from "./pages/UploadPage";
import { Route, Switch, useHistory } from "react-router-dom"
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';
// import StoreProvider from "./hooks/TestStore";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
  let history = useHistory();

  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        setIsLoading(false)
        setUsers(result.data)
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
  }, [])

  const signUpUser = (username, email, password) => {
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/users/',
      data: {
        username,
        email,
        password
      }
    })
      .then(response => {
        setCurrentUser(response.data.user)
        localStorage.setItem('token', response.data.auth_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast(response.data.message);
        history.push("/profile");
      })
      .catch(error => {
        if (error.response && error.response.data.status === "fail"){
          toast(error.response.data.message[0]);
        } else {
          toast("Something went wrong. Please try again later.");
        }
      })
  }
  const loginUser = (username, password) => {
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/login',
      data: {
        username,
        password
      }
    })
      .then(response => {
        setCurrentUser(response.data.user)
        localStorage.setItem('token', response.data.auth_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast(response.data.message);
        history.push("/profile");
      })
      .catch(error => {
        if (error.response && error.response.data.status === "fail"){
          toast(error.response.data.message[0]);
        } else {
          toast("Something went wrong. Please try again later.");
        }
      })
  }
  const logoutUser = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setCurrentUser(null)
    toast("Successfully logout!");
    history.push("/");
  }

  return (
    <>
      <NavBar currentUser={currentUser} signUpUser={signUpUser} loginUser={loginUser} logoutUser={logoutUser} />
      <ToastContainer />
      {isLoading ? <LoadingIndicator color="blue" size="200px" /> :
        <Switch>
          <Route exact path="/" component={() => <HomePage users={users} />} />
          <Route exact path="/profile" component={() => <MyProfilePage currentUser={currentUser} />} />
          <Route exact path="/upload" component={() => <UploadPage currentUser={currentUser} />} />
          <Route path="/users/:id" component={() => <UserProfilePage currentUser={currentUser}/>} />
        </Switch>
      }
    </>
  );
}
export default App;
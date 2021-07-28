import "./App.css";

import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  withRouter,
  Redirect,
} from "react-router-dom";

import Login from "./components/login/Login.js";
import Main from "./components/Main.js";
import Signup from "./pages/Signup.js";
import Mypage from "./pages/Mypage.js";
import ProfileEdit from "./pages/ProfileEdit";
import Header from "./components/Header";
import FacebookSignup from "./pages/FacebookSignup";
import FacebookLogin from "./components/login/FacebookLogin";
import OtherUserPage from "./pages/OtherUser";
import Upload from "./pages/UploadPage";

import * as accountService from "./helpers/accountService";
import axios from "axios";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [welcomeFB, setWelcomeFB] = useState(false);
  const [facebookData, setFacebookData] = useState({}); // {email, url}
  const [accessToken, setAccessToken] = useState('');
  const [userData, setUserData] = useState({});

  let history = useHistory();

  useEffect(() => {
    // localStorage.userdata = JSON.stringify(userData);
    // localStorage.accessToken = accessToken;
  }, [userData, accessToken]);

  async function facebookLogin() {
    console.log(
      "You pressed Facebook login button. Starting Facebook OAuth login..."
    );
    const { name } = await accountService.requestFacebookBasicProfile();
    const { email, id } = await accountService.requestFacebookEmail();
    const {accessToken, userdata} = await accountService.checkEmail(email);
    const url = await accountService.requestFacebookProfilePic(id);
    setFacebookData({ email, url, name });
    if (userData) {
      setWelcomeFB(true)
      setUserData(userdata)
      setAccessToken(accessToken)
    }
    else {
      setWelcomeFB(false);  
      setUserData(null)
      history.push("/facebooksignup");
    }
  }

  function renderDefaultPage() {
    if (isLogin) return <Main userData={userData}/>;
    else {
      if (welcomeFB) {
        return (
          <FacebookLogin
            setIsLogin={setIsLogin}
            facebookData={facebookData}
            setWelcomeFB={setWelcomeFB}
          />
        );
      } else {
        return (
          <Login
            setIsLogin={setIsLogin}
            facebookLogin={facebookLogin}
            setUserData={setUserData}
            setAccessToken={setAccessToken}
          />
        );
      }
    }
  }

  return (
    <>
      {/* {isLogin && <Header />} */}
      <Header />
      <Switch>
        <Route exact path="/">
          {renderDefaultPage()}
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/facebooksignup">
          <FacebookSignup />
        </Route>
        <Route path="/mypage/edit">
          <ProfileEdit userData={userData} setUserData={setUserData}/>
        </Route>
        <Route path="/mypage">
          <Mypage setIsLogin={setIsLogin} loggedInUserInfo={userData} setUserData={setUserData}/>
        </Route>
        <Route exact path="/upload">
          <Upload />
        </Route>
        <Route path="/:userId">
          <OtherUserPage />
          {/* TODO: Uncomment belwo when loggedInUser is ready */}
          {/* <OtherUserPage loggedInUserInfo={userData} /> */}
        </Route>
      </Switch>
    </>
  );
};

export default withRouter(App);

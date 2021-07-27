import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import Login from "./components/login/Login.js";
import Main from "./components/Main.js";
import Signup from "./pages/Signup.js";
import Mypage from "./pages/Mypage.js";
import BasicProfileEdit from './components/ProfileEdit/BasicProfileEdit'
import Header from "./components/Header";
import FacebookSignup from "./pages/FacebookSignup";
import FacebookLogin from "./components/login/FacebookLogin";
import OtherUserPage from "./pages/OtherUser";

import * as accountService from "./helpers/accountService";
import axios from "axios";

const App = function () {
  const [isLogin, setIsLogin] = useState(false);
  const [_facebookLogin, setFacebookLogin] = useState(false);
  const [fbUserSignedup, setFbUserSignedup] = useState(false);
  const [facebookData, setFacebookData] = useState(null); // {email, url}
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

  let history = useHistory();

  useEffect(() => {
    if (!fbUserSignedup && facebookData) {
      history.push("/facebooksignup");
    }
  });

  async function facebookLogin(history) {
    console.log(
      "You pressed Facebook login button. Starting Facebook OAuth login..."
    );
    const id = await accountService.requestFacebookLogin();
    if (id) {
      setFacebookLogin(true);
      const email = accountService.requestFacebookEmail();
      if (email) {
        const url = await accountService.requestFacebookProfilePic(id);
        if (url) {
          setFacebookData({ email, url });
        }
        const signedup = await checkEmail();
        if (signedup) {
          setFbUserSignedup(true);
        } else {
          setFbUserSignedup(false);
        }
        if (history) {
          history.push('/')
        }
      }
    }
    else setFacebookLogin(false);
  }

  async function checkEmail(email) {
    console.log("Checking the Facebook email from database...");
    const res = await axios.get(
      `https://www.fpserver.click/oauth?email=${email}`
    );
    console.log("Result from the database: ", res);
    if (res.data.message === "로그인 성공") {
      // 이미 회원가입 했음을 확인
      console.log("You already signed up on Enstagram.");
      return true;
    } else return false;
  }

  function renderDefaultPage() {
    if (isLogin) 
      return <Main />;
    else {
      if (_facebookLogin) {
        if (fbUserSignedup) {
          return (
            <FacebookLogin setIsLogin={setIsLogin} facebookData={facebookData} />
          );
        } 
        else {
          return (
            <Login
              setIsLogin={setIsLogin}
              facebookLogin={facebookLogin}
              setUserData={setUserData}
            />
          );
        }
      }
      else {
        return (
          <Login
            setIsLogin={setIsLogin}
            facebookLogin={facebookLogin}
            setUserData={setUserData}
          />
        );
      }
    }
  }

  return (
    <BrowserRouter>
      {/* {isLogin && <Header />} */}
      <Header />
      <Switch>
        <Route exact path="/">
          {renderDefaultPage()}
        </Route>
        <Route path="/signup">
          <Signup facebookLogin={facebookLogin} />
        </Route>
        <Route path="/facebooksignup">
          <FacebookSignup
            facebookData={facebookData}
            setUserData={setUserData}
          />
        </Route>
        <Route path="/mypage/edit">
          <BasicProfileEdit />
        </Route>
        <Route path="/mypage">
          <Mypage setIsLogin={setIsLogin} />
        </Route>
        <Route path="/:userId">
          <OtherUserPage />
          {/* TODO: Uncomment belwo when loggedInUser is ready */}
          {/* <OtherUserPage loggedInUserInfo={userData} /> */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

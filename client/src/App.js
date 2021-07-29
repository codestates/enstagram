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




// USER INFO
// comment_id: []
// createdAt: "2021-07-28T10:21:11.000Z"
// email: "jhoryong@gmail.com"
// follower_id: []
// following_id: []
// id: 4
// like_id: []
// name: "test1"
// post_id: (5) [7, 8, 10, 11, 12]
// profilePhoto: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
// updatedAt: "2021-07-28T12:31:28.000Z"
// username: "test1"




const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [welcomeFB, setWelcomeFB] = useState(false);
  const [facebookData, setFacebookData] = useState({}); // {email, url}
  const [accessToken, setAccessToken] = useState('');
  const [userData, setUserData] = useState({});

  const [userWrittenPost, setUserWrittenPost] = useState(null)
  let history = useHistory();

  async function facebookLogin() {
    console.log(
      "You pressed Facebook login button. Starting Facebook OAuth login..."
    );
    const { name } = await accountService.requestFacebookBasicProfile();
    const { email, id } = await accountService.requestFacebookEmail();
    const res = await accountService.checkEmail(email);
    if (res === "fail") {
      return;
    }
    else if (res === false) {
      setWelcomeFB(false);
      setUserData(null)
      history.push("/facebooksignup");
      return;
    }
    const { accessToken, userdata } = res;
    const url = await accountService.requestFacebookProfilePic(id);
    setFacebookData({ email, url, name });
    if (userData) {
      setWelcomeFB(true)
      setUserData(userdata)
      setAccessToken(accessToken)
    }
  }

  function renderDefaultPage() {
    if (isLogin) return <Main userData={userData} accessToken={accessToken} userWrittenPost={userWrittenPost} />;

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
      {isLogin && <Header profilePhoto={userData.profilePhoto} />}

      <Switch>
        {/* TODO: delete before pushing the code. Below route is for UI testing. */}
        {/* <Route exact path="/main">
          <Main />
        </Route> */}
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
          <ProfileEdit userData={userData} setUserData={setUserData} />
        </Route>
        <Route path="/mypage">

          <Mypage setIsLogin={setIsLogin} loggedInUserInfo={userData} setUserData={setUserData} />

        </Route>
        <Route exact path="/upload">
          <Upload userData={userData} setUserWrittenPost={setUserWrittenPost} />
        </Route>
        <Route path="/:userId">
          {/* <OtherUserPage /> */}
          {/* TODO: Uncomment belwo when loggedInUser is ready */}
          <OtherUserPage loggedInUserInfo={userData} />
        </Route>
      </Switch>
    </>
  );
};

export default withRouter(App);

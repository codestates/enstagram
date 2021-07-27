import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import Login from "./components/login/Login.js";
import Main from "./components/Main.js";
import Signup from "./pages/Signup.js";
import Mypage from "./pages/Mypage.js";
import ProfileEdit from "./pages/ProfileEdit.js";
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


  const App = function ({ _isFbLoggedIn }) {

    const [isLogin, setIsLogin] = useState(false);
    const [isFbLogin, setIsFbLogin] = useState(_isFbLoggedIn);
    const [userData, setUserData] = useState(null);
    const [facebookProfile, setFacebookProfile] = useState({}); // {email: email, profilePicture: pictureUrl}
    //let history = useHistory();

    useEffect(() => {
      // 앱이 로드될 때 만약 facebook 에 로그인된 상태일 경우 email을 가져온다.
      async function requestAndCheckFbEmail() {
        if (isFbLogin) {
          console.log("You are already logged into Facebook. Fetching information...")
          const facebookUserInfo = await handleRequestEmailFromFacebook();
          console.log("Here is your information: ", facebookUserInfo)

          if (facebookUserInfo) {
            const { email, id } = facebookUserInfo;
            const _userData = await handleCheckEmailFromServer(email);

            // 이미 회원가입이 되어있을 경우
            if (_userData) {
              setUserData(_userData);
            }
            // 회원가입이 안되어 있을 경우
            else {
              // facebook profile pic 요청
              const profilePicData = await requestFacebookProfilePic(id);
              const { url } = profilePicData.data;
              setFacebookProfile({ email: email, profilePicture: url });
            }
          }
        }
      }

      requestAndCheckFbEmail();
    }, [isFbLogin])


    async function handleRequestEmailFromFacebook() {
      const res = await requestFacebookEmail();
      if (res) {
        return { email: res.email, id: res.id };
      }
    }

    async function handleCheckEmailFromServer(email) {
      console.log("Checking the Facebook email from database...")

      // db 에 회원가입된 email 이 있는지 체크
      const res = await axios.get(
        `https://www.fpserver.click/oauth?email=${email}`
      );
      console.log('Result from the database: ', res)

      // 유저가 이미 회원가입 했을 시
      if (res.data.message === "로그인 성공") {
        console.log("You already signed up on Enstagram.")
        return res.data.data; // profile pic, username
      }
      // 아닐 시
      else {
        console.log("You have not signed up on Enstagram.")
        return null;
      }
    }


    // ─── FACEBOOK LOGIN BUTTON ──────────────────────────────────────────────────────
    //
    async function handleFacebookLogin(history) {
      console.log("You pressed Facebook login button. Starting Facebook OAuth login...");

      // 페이스북에 로그인되어있는데 버튼을 눌렀다 --> 
      // 회원인지 체크 후,
      // 회원이다 -> FacebookLogin 페이지
      // 회원이 아니다 -> FbSignup 페이지
      // --> Facebook 회원가입 페이지로 이동 (email, profile pic)
      if (isFbLogin) {
        if (userData) {
          history.push('/');
        }
        else {
          console.log("You are redirected to Facebook signup page.")
          history.push('/fbsignup')
        }
      }

      // 페이스북에 로그인하지 않았을 경우 --> state update 없이 진행한다.
      else {
        // 1. 로그인 팝업창을 띄워 페이스북에 로그인을 유도한다.
        const isFacebookLogin = await requestFacebookLogin();
        if (isFacebookLogin) {
          setIsFbLogin(true);
          console.log("You are logged into Facebook. Fetching information...")
          const facebookUserInfo = await handleRequestEmailFromFacebook();
          console.log("Here is your information: ", facebookUserInfo)

          if (facebookUserInfo) {
            const { email, id } = facebookUserInfo;
            const _userData = await handleCheckEmailFromServer(email);

            // 이미 회원가입이 되어있을 경우
            if (_userData) {
              setUserData(_userData);
            }
            // 회원가입이 안되어 있을 경우
            else {
              // facebook profile pic 요청
              const profilePicData = await requestFacebookProfilePic(id);
              const { pictureUrl } = profilePicData;
              setFacebookProfile({ email: email, profilePicture: pictureUrl });
            }
          }
        }
      }

      // ────────────────────────────────────────────────────────────────────────────────


      function renderDefaultPage() {
        if (isFbLogin) { // 페이스북에 로그인한 상태라면
          // 이미 앱에 로그인을 한 상태라면
          if (isLogin) {
            return <Main userData={userData} />;
          }
          // 앱에 로그인을 안했다면
          else {
            // 앱에 회원가입이 되어있다면 continue as 페이지
            if (userData) {
              return (
                <FacebookLogin
                  userData={userData}
                  setIsLogin={setIsLogin}
                  setIsFbLogin={setIsFbLogin}
                />);
            }
            else { // 안되어있다면 login 페이지
              return (
                <Login
                  setIsLogin={setIsLogin}
                  handleFacebookLogin={handleFacebookLogin}
                  setUserData={setUserData}
                />
              );
            }
          }
        }
        else { // 페이스북에 로그인한 상태가 아니라면
          // 이미 앱에 로그인을 한 상태라면
          if (isLogin) {
            return <Main userData={userData} />;
          }
          // 앱에 로그인한 상태가 아니라면
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
              <Signup
                handleFacebookLogin={handleFacebookLogin}
                setUserData={setUserData}
              />
            </Route>
            <Route path="/mypage/edit">
              <ProfileEdit />
            </Route>
            <Route path="/mypage">
              <Mypage setIsLogin={setIsLogin} />
            </Route>
            <Route path="/:userId">
              <OtherUserPage />
              {/* TODO: Uncomment belwo when loggedInUser is ready */}
              {/* <OtherUserPage loggedInUserInfo={userData} /> */}
            </Route>
            <Route path="/fbsignup">
              <FbSignup
                facebookProfile={facebookProfile}
                setUserData={setUserData}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      );
    }
  }

  export default App;

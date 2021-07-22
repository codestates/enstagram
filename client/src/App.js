import logo from "./logo.svg";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Login from "./components/Login.js";
import Main from "./components/Main.js";
import Signup from "./pages/Signup.js";
import Mypage from "./pages/Mypage.js";
import ProfileEdit from "./pages/ProfileEdit.js";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  function requestFacebookLogin() {
    // fb아이디로 로그인하기 클릭
    // 클라가 fb서버에 authorization code 요청
    // fb의 소셜로그인관련 사이트로 이동
    // 권한 허용 클릭
    // fb서버가 redirect uri 를 통해 code 보냄
    // 클라는 code 를 서버에 전달
    // 서버는 fb서버에 code 를 보내서 access token 요청
    // fb서버는 서버에 access token 보냄
    // 서버가 클라에 access token 전달
    // 소셜로그인 완료 - 페이스북 로그인 페이지로 이동
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLogin ? (
            <Main />
          ) : (
            <Login
              setIsLogin={setIsLogin}
              requestFacebookLogin={requestFacebookLogin}
            />
          )}
        </Route>
        <Route path="/signup">
          <Signup
            setIsLogin={setIsLogin}
            requestFacebookLogin={requestFacebookLogin}
          />
        </Route>
        <Route path="/mypage">
          <Mypage />
        </Route>
        <Route path="/mypage/edit">
          <ProfileEdit />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

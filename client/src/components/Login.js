import "./Login.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
const axios = require('axios');

function Login({ setIsLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function requestLogin() {
    // 서버에 로그인 요청
    // 로그인 성공할 경우 setIsLogin(true) 호출
  }

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
    <div className="container">
      <div className="login-box box-1">
        <h1 className="logo">Enstagram</h1>
        <input
          className="input-box"
          type="text"
          placeholder="username"
          value={username}
          onChange={handleChangeUsername}
        />
        <input
          className="input-box"
          type="text"
          placeholder="password"
          value={password}
          onChange={handleChangePassword}
        />
        <button className="login-button" type="submit" onClick={requestLogin}>
          로그인
        </button>
        <div className="line"></div>
        <span className="or-text">또는</span>
        <button className="facebook-login">
          <FontAwesomeIcon
            className="facebook-icon"
            icon={faFacebookSquare}
            onClick={requestFacebookLogin}
          />
          Facebook으로 로그인
        </button>
      </div>
      <div className="login-box box-2">
        <span className="no-account">
          계정이 없으신가요? <Link to="/signup" className="sign-up">가입하기</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;

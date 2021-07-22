import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import Footer from '../components/Footer'
const axios = require("axios");

function Login({ setIsLogin, requestFacebookLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(true);

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

  return (
    <div>
      <div className="container">
        <div className="login-box box-1">
          <h1 className="logo">Enstagram</h1>
          <input
            className="input-box login-input-1"
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
          {invalidUsername ? (
            <span className="invalid-msg">
              입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을
              확인하고 다시 시도하세요.
            </span>
          ) : null}
          {invalidPassword ? (
            <span className="invalid-msg">
              잘못된 비밀번호입니다. 다시 확인하세요.
            </span>
          ) : null}
        </div>
        <div className="login-box box-2">
          <span className="no-account">
            계정이 없으신가요?{" "}
            <Link to="/signup" className="signup-link">
              가입하기
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;

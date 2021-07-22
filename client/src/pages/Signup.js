import "./Signup.css";
import Footer from '../components/Footer.js'
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
const axios = require("axios");

function Signup({ setIsLogin, requestFacebookLogin }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function requestSignup() {
    // 서버에 로그인 요청
    // 로그인 성공할 경우 setIsLogin(true) 호출
  }

  return (
    <div>
      `<div className="container">
        <div className="login-box box-1">
          <h1 className="logo">Enstagram</h1>
          <span className="signup-text">
            친구들의 사진과 동영상을 보려면 가입하세요.
          </span>
          <button className="signup-facebook-login">
            <FontAwesomeIcon
              className="facebook-icon"
              icon={faFacebookSquare}
              onClick={requestFacebookLogin}
            />
            Facebook으로 로그인
          </button>
          <div className="line"></div>
          <span className="or-text">또는</span>
          <input
            className="input-box signup-input-1"
            type="text"
            placeholder="email"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            className="input-box"
            type="text"
            placeholder="name"
            value={name}
            onChange={handleChangeName}
          />
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
          <button className="signup-button" type="submit" onClick={requestSignup}>
            가입
          </button>
        </div>
        <div className="login-box box-2">
          <span className="no-account">
            계정이 있으신가요?{" "}
            <Link to="/" className="login-link">
              로그인
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;

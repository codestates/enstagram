import "../commonCss/login-signup.css";
import "./Login.css";

import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

import Footer from "../components/Footer";

import axios from 'axios'

const Login = function({ setIsLogin, handleFacebookLogin, setUserData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState("empty");
  const [isPasswordValid, setIsPasswordValid] = useState("empty");
  const [isDisabled, setIsDisabled] = useState(true);
  let history = useHistory();


  function changeLoginButtonState(str) {
    if (str === "") setIsDisabled(true);
    else if (isUsernameValid === "valid" && isPasswordValid === "valid") {
      setIsDisabled(false);
    } else setIsDisabled(true);
  };


  function handleChangeUsername(event) {
    const str = event.target.value;
    setUsername(str);
    if (str === "") {
      setIsUsernameValid("empty");
    } else setIsUsernameValid("valid");
    changeLoginButtonState(str);
  };


  function handleChangePassword(event) {
    const str = event.target.value;
    setPassword(str);
    if (str === "") {
      setIsPasswordValid("empty");
    } else setIsPasswordValid("valid");
    changeLoginButtonState(str);
  };


  async function requestLogin() {
    // 서버에 로그인 요청
    // 로그인 성공할 경우 setIsLogin(true) 호출
    // 실패할 경우 서버 메세지에 따라 안내문 띄움.
    console.log("Login button clicked. Requesting login...")
    const res = await axios.post(
      "https://www.fpserver.click/",
      {
        username: username,
        password: password,
      }
    );
    console.log(res);
    if (res.data.message === "로그인 성공 ") {
      console.log("Login succesful")
      setIsLogin(true)
      // 서버에 GET 요청...?
    }
  };


  return (
    <div>
      <div className="login-signup-container">
        <div className="login-signup-box box-1">
          <h1 className="logo">Enstagram</h1>
          <input
            className="login-signup-input-box  login-input-1"
            type="text"
            placeholder="사용자 이름 또는 이메일"
            value={username}
            onChange={handleChangeUsername}
          />
          <input
            className="login-signup-input-box "
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleChangePassword}
          />
          <button
            className={`login-signup-button login-button ${
              isDisabled ? "login-signup-button-disabled" : null
            }`}
            type="submit"
            onClick={requestLogin}
            disabled={isDisabled}
          >
            로그인
          </button>
          <div className="line"></div>
          <span className="or-text">또는</span>
            
          {/* ---FACEBOOK LOGIN BUTTON--- */}
          <button
            className="login-facebook-login-button"
            onClick={()=>handleFacebookLogin(history)}
          >
            <FontAwesomeIcon
              className="facebook-icon"
              icon={faFacebookSquare}
            />
            Facebook으로 로그인
          </button>

          {isUsernameValid === "invalid" ? (
            <span className="invalid-msg">
              입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자
              이름을 확인하고 다시 시도하세요.
            </span>
          ) : null}
          {isPasswordValid === "invalid" ? (
            <span className="invalid-msg">
              잘못된 비밀번호입니다. 다시 확인하세요.
            </span>
          ) : null}
        </div>
        <div className="login-signup-box box-2">
          <span className="no-account">
            계정이 없으신가요?{" "}
            <Link to="/signup" className="login-signup-link">
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

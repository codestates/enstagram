import "../../commonCss/login-signup.css"
import "./Login.css";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import Footer from "../Footer";
import axios from 'axios'

const Login = ({ setIsLogin, facebookLogin, setUserData }) => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [invalidId, setInvalidId] = useState(false);
  const [invalidPw, setInvalidPw] = useState(false);
  let history = useHistory();

  useEffect(() => {
    enable();
  })

  function inputUsername(e) {
    setUsername(e.target.value);
  };
  function inputPassword(e) {
    setPassword(e.target.value);
  };

  function enable() {
    if (username && password) {
      setDisabled(false)
    }
    else setDisabled(true)
  }

  async function requestLogin() {
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
      // setUsername('')
      // setPassword('')
      setIsLogin(true)
    }
    else if (res.data.message="아이디 오류"){
      setInvalidPw(false);
      setInvalidId(true);
    }
    else if (res.data.message="비밀번호 오류"){
      setInvalidId(false);
      setInvalidPw(true)
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-signup-container">
        <div className="login-signup-box box-1">
          <h1 className="logo">Enstagram</h1>
          <input
            className="login-signup-input-box  login-input-1"
            type="text"
            placeholder="사용자 이름 또는 이메일"
            value={username}
            onChange={inputUsername}
          />
          <input
            className="login-signup-input-box "
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={inputPassword}
          />
          <button
            className={`login-signup-button login-button ${
              disabled ? "login-signup-button-disabled" : null
            }`}
            type="submit"
            onClick={requestLogin}
            disabled={disabled}
          >
            로그인
          </button>
          <div className="line"></div>
          <span className="or-text">또는</span>
            
          {/* ---FACEBOOK LOGIN BUTTON--- */}
          <button
            className="login-facebook-login-button"
            onClick={facebookLogin}
          >
            <FontAwesomeIcon
              className="facebook-icon"
              icon={faFacebookSquare}
            />
            Facebook으로 로그인
          </button>

          {invalidId ? (
            <span className="invalid-msg">
              입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자
              이름을 확인하고 다시 시도하세요.
            </span>
          ) : null}
          {invalidPw ? (
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

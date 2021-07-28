import "../commonCss/login-signup.css";
import "./Signup.css";

import Footer from "../components/Footer.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { validateEmail } from "../validator/validator";
import axios from 'axios'

const Signup = function() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailRegexInvalid, setEmailRegexInvalid] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    if (email) {
      if (validateEmail(email))
        setEmailRegexInvalid(false);
      else setEmailRegexInvalid(true);
    }
    else setEmailRegexInvalid(false);

    enable();
  }, [email, name, username, password])

  function enable() {
    if (email && name && username && password && !emailRegexInvalid)
      setDisabled(false);
    else setDisabled(true);
  };

  function inputEmail(e) {
    setEmail(e.target.value)
  };
  function inputName(e) {
    setName(e.target.value)
  };
  function inputUsername(e) {
    setUsername(e.target.value)
  };
  function inputPassword(e) {
    setPassword(e.target.value)
  };

  async function requestSignup() {
    console.log("Signup button clicked. Requesting signup...")
    const res = await axios.post(
      "https://www.fpserver.click/signup",
      {
        email: email,
        username: username,
        name: name,
        password: password,
      }
    );
    console.log(res);

    if (res.data.message === "회원가입 성공") {
      console.log("Signup successful.")
      setInvalidUsername(false);
      setInvalidEmail(false);
      setSignupSuccess(true);
    } 
    else {
      console.log("Signup failed.")
      const msg = res.data.message;
      console.log(msg);

      if (msg === "이미 존재하는 email 입니다") {
        console.log("Duplicate email.")
        setSignupSuccess(false)
        setInvalidUsername(false);
        setInvalidEmail(true);
      } 
      else if (msg === "이미 존재하는 username 입니다") {
        console.log("Duplicate username.")
        setSignupSuccess(false)
        setInvalidEmail(false);
        setInvalidUsername(true);
      }
    }
  }

  return (
    <div class="signup-page-container">
      <div className="login-signup-container signup">
        <div className="login-signup-box box-1">
          <h1 className="logo">Enstagram</h1>
          <span className="signup-text">
            친구들의 사진과 동영상을 보려면 가입하세요.
          </span>

          <input
            className={`login-signup-input-box signup-input-1`}
            type="text"
            placeholder="이메일 주소"
            value={email}
            onChange={inputEmail}
          />
          <input
            className="login-signup-input-box "
            type="text"
            placeholder="성명"
            value={name}
            onChange={inputName}
          />
          <input
            className="login-signup-input-box "
            type="text"
            placeholder="사용자 이름"
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
          {emailRegexInvalid ? (
            <span className="invalid-msg">
              잘못된 이메일입니다. 다시 확인하세요.
            </span>
          ) : null}
          {invalidEmail ? (
            <span className="invalid-msg">이미 존재하는 이메일입니다.</span>
          ) : null}
          {invalidUsername ? (
            <span className="invalid-msg">
              이미 존재하는 사용자 이름입니다.
            </span>
          ) : null}
          {signupSuccess ? (
            <span className="valid-msg">
              회원가입에 성공했습니다. 로그인 페이지에서 로그인 해 주세요.
            </span>
          ) : null}
          <button
            className={`login-signup-button signup-button ${
              disabled ? "login-signup-button-disabled" : null
            }`}
            type="submit"
            onClick={requestSignup}
            disabled={disabled}
          >
            가입
          </button>
        </div>
        <div className="login-signup-box box-2">
          <span className="no-account">
            계정이 있으신가요?{" "}
            <Link to="/" className="login-signup-link">
              로그인
            </Link>
          </span>
        </div>
      </div>
      <div className="signup-footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Signup;

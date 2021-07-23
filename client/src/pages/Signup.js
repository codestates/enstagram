import "./Signup.css";
import Footer from "../components/Footer.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { validateEmail } from "../validator/validator";
const axios = require("axios");

function Signup({ setIsLogin, requestFacebookLogin, setUserData }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState("empty");
  const [isNameValid, setIsNameValid] = useState("empty");
  const [isUsernameValid, setIsUsernameValid] = useState("empty");
  const [isPasswordValid, setIsPasswordValid] = useState("empty");

  const [isDisabled, setIsDisabled] = useState(true);

  function changeButtonState(str) {
    if (str === "")
      setIsDisabled(true);
    else if (
      isEmailValid === "valid" &&
      isNameValid === "valid" &&
      isUsernameValid === "valid" &&
      isPasswordValid === "valid"
    ) {
      setIsDisabled(false);
    }
    else setIsDisabled(true);
  }

  function handleChangeEmail(event) {
    const str = event.target.value;
    setEmail(str);
    if (str === "") 
      setIsEmailValid("empty");
    else if (!validateEmail(str)) setIsEmailValid("invalid");
    else setIsEmailValid("valid");
    changeButtonState(str);
  }

  function handleChangeName(event) {
    const str = event.target.value;
    setName(str);
    if (str === "") {
      setIsNameValid("empty");
    } else setIsNameValid("valid");
    changeButtonState(str);
  }

  function handleChangeUsername(event) {
    const str = event.target.value;
    setUsername(str);
    if (str === "") {
      setIsUsernameValid("empty");
    } else setIsUsernameValid("valid");
    changeButtonState(str);
  }

  function handleChangePassword(event) {
    const str = event.target.value;
    setPassword(str);
    if (str === "") {
      setIsPasswordValid("empty");
    } else setIsPasswordValid("valid");
    changeButtonState(str);
  }

  async function requestSignup() {
    const res = await axios.post(
      "http://ec2-15-165-74-82.ap-northeast-2.compute.amazonaws.com/signup",
      {
        email: email,
        username: username,
        name: name,
        password: password,
      }
    );
    console.log(res);
    if (res.data.message === "회원가입 성공") {
      const { userData } = res.data;
      setUserData(userData);
      setIsLogin(true);
    } else {
      // 어떤 정보가 중복이었는지 알려주기
    }
    // 서버에 로그인 요청
    // 로그인 성공할 경우 setIsLogin(true) 호출
  }

  return (
    <div>
      <div className="container">
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
            className={`input-box signup-input-1 ${
              email ? "placeholder-shrink" : null
            }`}
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
            type="password"
            placeholder="password"
            value={password}
            onChange={handleChangePassword}
          />
          {isEmailValid === "invalid" ? (
            <span className="invalid-msg">
              잘못된 이메일입니다. 다시 확인하세요.
            </span>
          ) : null}
          <button
            className={`signup-button ${
              isDisabled ? "signup-button-disabled" : null
            }`}
            type="submit"
            onClick={requestSignup}
            disabled={isDisabled}
          >
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

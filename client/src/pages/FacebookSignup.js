import '../commonCss/login-signup.css'
import './FacebookSignup.css'

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as accountService from "../helpers/accountService"
import axios from 'axios'

const FacebookSignup = function () {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fbdata, setFbdata] = useState({})
  const [disabled, setDisabled] = useState(true);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const { email, id } = await accountService.requestFacebookEmail();
      const url = await accountService.requestFacebookProfilePic(id);
      setFbdata({ email, url })
    }
    fetchData();
  }, [])

  useEffect(() => {
    enable();
  }, [username, name, password])

  useEffect(() => {
    if (success) {

    }
  }, [success])

  function enable() {
    if (username && name && password) setDisabled(false);
    else setDisabled(true);
  }

  function inputName(event) {
    setName(event.target.value);
  }
  function inputUsername(event) {
    setUsername(event.target.value);
  }
  function inputPassword(event) {
    setPassword(event.target.value);
  }


  async function requestSignup() {
    console.log("Signup button clicked. Requesting signup...")
    const res = await axios.post(
      "https://www.fpserver.click/signup",
      {
        email: fbdata.email,
        username: username,
        name: name,
        password: password,
      }
    );
    console.log(res);
    if (res.data.message === "회원가입 성공") {
      console.log("Signup successful.")
      setUsernameInvalid(false);
      setSuccess(true);
      setUsername('')
      setName('')
      setPassword('');
      setTimeout(() => {
        history.push('/')
      }, 2000)
    }
    else {
      console.log("Signup failed.")
      const msg = res.data.message;
      if (msg === "이미 존재하는 username 입니다") {
        console.log("Duplicate username.")
        setUsernameInvalid(true);
      }
      else setUsernameInvalid(false);
    }
  }


  return (
    <div className="login-signup-container fb-signup-container">
      <div className="login-signup-box box-1">
        <h1 className="logo">Enstagram</h1>
        <img
          src={fbdata.url}
          className="fblogin-profile-pic"
          alt="facebook profile"
        />
        <input
          className="login-signup-input-box"
          type="text"
          placeholder="성명"
          value={name}
          onChange={inputName}
        />
        <input
          className="login-signup-input-box"
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={inputUsername}
        />
        <input
          className="login-signup-input-box"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={inputPassword}
        />
        {usernameInvalid ? (
          <span className="invalid-msg">
            이미 존재하는 사용자 이름입니다.
          </span>
        ) : null}
        {success ? (
          <span className="valid-msg">
            페이스북 회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.
          </span>
        ) : null}
        <button
          className={`login-signup-button fb-signup-button ${disabled ? "login-signup-button-disabled" : null
            }`}
          type="submit"
          onClick={requestSignup}
          disabled={disabled}
        >
          가입
        </button>
      </div>
    </div>
  );
}

export default FacebookSignup
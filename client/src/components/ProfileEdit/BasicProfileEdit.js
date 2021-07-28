import "../../App.css";
import "./BasicProfileEdit.css";

import dummyUser from "../../dummyData/dummyUser";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const BasicProfileEdit = ({userData = dummyUser, setUserData}) => {
  console.log("profileEdit: userData", userData)

  const [name, setName] = useState(userData.name);
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [picture, setPicture] = useState(userData.profilePhoto);
  const [disabled, setDisabled] = useState(true);

  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [picSuccess, setPicSuccess] = useState(false);
  const localupload = true;

  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    enable();
  });

  function inputName(e) {
    setName(e.target.value);
  }
  function inputUsername(e) {
    setUsername(e.target.value);
  }
  function inputEmail(e) {
    setEmail(e.target.value);
  }

  function enable() {
    if (
      name &&
      username &&
      email &&
      (name !== userData.name ||
        username !== userData.username ||
        email !== userData.email)
    ) {
      setDisabled(false);
    } else setDisabled(true);
  }

  function submit() {
    axios.put("https://fpserver.click/edituserinfo", {
      username: "",
      newname: name,
      newusername: username,
      newemail: email,
    })
    .then((res) => {
      if (res.data.message === "유저 데이터 변경 성공"){
        setInvalidUsername(false)
        setPicSuccess(false);
        setInvalidEmail(false)
        setSuccess(true);
      }
      else if (res.data.message === '이미 존재하는 email 입니다'){
        setInvalidUsername(false)
        setSuccess(false);
        setPicSuccess(false);
        setInvalidEmail(true)
      }
      else if (res.data.message === '이미 존재하는 username 입니다'){
        setInvalidEmail(false)
        setSuccess(false);
        setPicSuccess(false);
        setInvalidUsername(true)
      }
    })
  }

  function inputClick(e) {
    hiddenFileInput.current.click();
  }

  async function fileChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    const result = await encodeBase64ImageFile(fileUploaded);
    if (localupload) {
        setPicture(result);
      return;
    }
    axios
      .put("https://fpserver.click/editprofilephoto", {
        username: "",
        picture: result,
      })
      .then((res) => {
        if (res.data.message === "프로필 사진 변경 성공") {
          setInvalidEmail(false)
          setInvalidUsername(false)
          setSuccess(false);
          setPicSuccess(true);
          setPicture(res.data.data);
        }
      });
  }

  function encodeBase64ImageFile(image) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      // convert the file to base64 text
      reader.readAsDataURL(image);
      // on reader load somthing...
      reader.onload = (event) => {
        console.log(event.target.result);
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <div className="basic-profile-container">
      <div className="profile-element">
        <label className="profile-edit-label">
          <img src={picture} className="profile-edit-pic" alt="profile" />
        </label>
        <div className="profile-edit-input-wrapper edit-profile-pic">
          <span>{userData.username}</span>
          <button
            className="login-signup-link edit-profile-pic-button"
            onClick={inputClick}
          >
            프로필 사진 바꾸기
          </button>
          {/* Make the file input element invisible */}
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={fileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="profile-element">
        <label className="profile-edit-label">
          <span>이름</span>
        </label>
        <div className="profile-edit-input-wrapper">
          <input
            className="profile-edit-input"
            value={name}
            onChange={inputName}
          />
        </div>
      </div>

      <div className="profile-element">
        <label className="profile-edit-label">
          <span>사용자 이름</span>
        </label>
        <div className="profile-edit-input-wrapper">
          <input
            className="profile-edit-input"
            value={username}
            onChange={inputUsername}
          />
        </div>
      </div>

      <div className="profile-element">
        <label className="profile-edit-label">
          <span>이메일</span>
        </label>
        <div className="profile-edit-input-wrapper">
          <input
            className="profile-edit-input"
            value={email}
            onChange={inputEmail}
          />
        </div>
      </div>
      {success ? (
        <div className="profile-element">
          <label className="profile-edit-label">
            <span></span>
          </label>
          <div className="profile-edit-input-wrapper">
            <span className="profile-edit-valid-msg">
              정보가 변경되었습니다.
            </span>
          </div>
        </div>
      ) : null}
      {invalidUsername ? (
        <div className="profile-element">
          <label className="profile-edit-label">
            <span></span>
          </label>
          <div className="profile-edit-input-wrapper">
            <span className="profile-edit-invalid-msg">
              이미 존재하는 사용자 이름입니다
            </span>
          </div>
        </div>
      ) : null}
      {invalidEmail ? (
        <div className="profile-element">
          <label className="profile-edit-label">
            <span></span>
          </label>
          <div className="profile-edit-input-wrapper">
            <span className="profile-edit-invalid-msg">
              이미 존재하는 이메일입니다
            </span>
          </div>
        </div>
      ) : null}
      {picSuccess ? (
        <div className="profile-element">
          <label className="profile-edit-label">
            <span></span>
          </label>
          <div className="profile-edit-input-wrapper">
            <span className="profile-edit-valid-msg">
              프로필 사진이 변경되었습니다.
            </span>
          </div>
        </div>
      ) : null}
      <div className="profile-element">
        <label className="profile-edit-label">
          <span></span>
        </label>
        <div className="profile-edit-input-wrapper">
          <button
            className={`profile-edit-submit 
              ${disabled ? "button-disabled" : null}`}
            disabled={disabled}
            onClick={submit}
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicProfileEdit;

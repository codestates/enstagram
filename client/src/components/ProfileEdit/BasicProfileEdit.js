import "./BasicProfileEdit.css";
import "../../App.css";
import dummyUser from "../../dummyData/dummyUser";
import React from 'react'
import { useState, useEffect } from "react";

const BasicProfileEdit = () => {
  const [name, setName] = useState(dummyUser.name);
  const [username, setUsername] = useState(dummyUser.username);
  const [email, setEmail] = useState(dummyUser.email);
  const [picture, setPicture] = useState(dummyUser.profilepicture)
  const [disabled, setDisabled] = useState(true);

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
      name && username && email && (
      name !== dummyUser.name ||
      username !== dummyUser.username ||
      email !== dummyUser.email)
    ) {
      setDisabled(false);
    }
    else setDisabled(true);
  }

  function submit() {

  }

  function inputClick(e) {
    hiddenFileInput.current.click();
  }

  async function fileChange(e) {
    const fileUploaded = e.target.files[0];
    const result = await encodeBase64ImageFile(fileUploaded);
    if (result) setPicture(result);
  }

  function encodeBase64ImageFile(image) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      // convert the file to base64 text
      reader.readAsDataURL(image)
      // on reader load somthing...
      reader.onload = (event) => {
        console.log(event.target.result)
        resolve(event.target.result)
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <div className="basic-profile-container">
      <div className="profile-element">
        <label className="profile-edit-label">
          <img
            src={picture}
            className="profile-edit-pic"
            alt="profile"
          />
        </label>
        <div className="profile-edit-input-wrapper edit-profile-pic">
          <span>{dummyUser.username}</span>
          <button className="login-signup-link edit-profile-pic-button" onClick={inputClick}>
            프로필 사진 바꾸기
          </button>
           {/* Make the file input element invisible */}
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={fileChange}
            style={{display: 'none'}}
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

import "./BasicProfileEdit.css";
import "../../App.css";
import dummyUser from "../../dummyData/dummyUser";
import { useState, useEffect } from "react";

const BasicProfileEdit = () => {
  const [name, setName] = useState(dummyUser.name);
  const [username, setUsername] = useState(dummyUser.username);
  const [email, setEmail] = useState(dummyUser.email);
  const [disabled, setDisabled] = useState(true);

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
      name !== dummyUser.name ||
      username !== dummyUser.username ||
      email !== dummyUser.email
    ) {
      setDisabled(false);
    }
    else setDisabled(true);
  }

  function submit() {

  }

  function submitPicture() {

  }

  return (
    <div clssName="basic-profile-container">
      <div className="profile-element">
        <label className="profile-edit-label">
          <img
            src={dummyUser.profilepicture}
            className="profile-edit-pic"
            alt="profile"
          />
        </label>
        <div className="profile-edit-input-wrapper edit-profile-pic">
          <span>{dummyUser.username}</span>
          <button className="login-signup-link edit-profile-pic-button" onClick={submitPicture}>
            프로필 사진 바꾸기
          </button>
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

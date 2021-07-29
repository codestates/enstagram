import "./PasswordEdit.css";
import { useState, useEffect } from "react";
//import dummyUser from "../../dummyData/dummyUser";
import axios from "axios";

const PasswordEdit = ({userData}) => {
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw1, setNewPw1] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [pwNotMatch, setPwNotMatch] = useState(false);

  useEffect(() => {
    enable();
  });

  function inputOldPw(e) {
    setOldPw(e.target.value);
  }
  function inputNewPw(e) {
    setNewPw(e.target.value);
  }
  function inputNewPw1(e) {
    setNewPw1(e.target.value);
  }

  function enable() {
    if (oldPw && newPw && newPw1 &&
      oldPw !== newPw &&
      newPw === newPw1) {
      setDisabled(false);
    }
    else setDisabled(true);
  }

  function submit() {
    axios.put('https://fpserver.click/editpassword', {
      username: '',
      oldpw: oldPw,
      newpw: newPw1
    })
      .then((res) => {
        if (res.data.message === "비밀번호 변경 성공") {
          setOldPw('')
          setNewPw('')
          setNewPw1('')
          setPwNotMatch(false);
          setSuccess(true);
        }
        else if (res.data.message === "비밀번호가 다릅니다") {
          setSuccess(false);
          setPwNotMatch(true);
        }
      })
  }

  return (
    <div className="basic-profile-container">
      <div className="profile-element">
        <label className="profile-edit-label">
          <img
            src={userData.profilePhoto}
            className="profile-edit-pic"
            alt="profile"
          />
        </label>
        <div className="profile-edit-input-wrapper edit-profile-pic">
          <span>{userData.username}</span>
        </div>
      </div>
      <div className="profile-element">
        <label className="profile-edit-label">
          <span>이전 비밀번호</span>
        </label>
        <div className="profile-edit-input-wrapper">
          <input
            className="profile-edit-input"
            type="password"
            value={oldPw}
            onChange={inputOldPw}
          />
        </div>
      </div>
      <div className="profile-element">
        <label className="profile-edit-label">
          <span>새 비밀번호</span>
        </label>
        <div className="profile-edit-input-wrapper">
          <input
            className="profile-edit-input"
            type="password"
            value={newPw}
            onChange={inputNewPw}
          />
        </div>
      </div>
      <div className="profile-element">
        <label className="profile-edit-label">
          <span>새 비밀번호 확인</span>
        </label>
        <div className="profile-edit-input-wrapper">
          <input
            className="profile-edit-input"
            type="password"
            value={newPw1}
            onChange={inputNewPw1}
          />
        </div>
      </div>
      {pwNotMatch ? (
        <div className="profile-element">
          <label className="profile-edit-label">
            <span></span>
          </label>
          <div className="profile-edit-input-wrapper">
            <span className="profile-edit-invalid-msg">
              기존 비밀번호가 틀립니다.
            </span>
          </div>
        </div>
      ) : null}
      {success ? (
        <div className="profile-element">
          <label className="profile-edit-label">
            <span></span>
          </label>
          <div className="profile-edit-input-wrapper">
            <span className="profile-edit-valid-msg">
              비밀번호를 변경했습니다.
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
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordEdit;

import './BasicProfileEdit.css'
import '../../App.css'
const BasicProfileEdit = () => {
  return (
    <div clssName="basic-profile-container">
      <div className="profile-element profile-element-pic">
        <aside className="profile-edit-label-box profile-pic-element">
          <img 
            src="https://grepp-programmers.s3.amazonaws.com/files/production/10f4f72c93/1d932bfc-8082-4b7e-b30d-ab46bf71a9f2.png" 
            className="profile-edit-pic"
            alt="profile"
          />
        </aside>
        <div className="profile-edit-input-box pic-edit-box">
          <span>Username</span>
          <button className="login-signup-link profile-change-button">프로필 사진 바꾸기</button>
        </div>
      </div>
      <div className="profile-element">
        <aside className="profile-edit-label-box">
          <label className="profile-edit-label">이름</label>
        </aside>
        <div className="profile-edit-input-box">
          <input className="profile-edit-input"/>
        </div>
      </div>
      <div className="profile-element">
        <aside className="profile-edit-label-box">
          <label className="profile-edit-label">사용자 이름</label>
        </aside>
        <div className="profile-edit-input-box">
          <input className="profile-edit-input"/>
        </div>
      </div>
      <div className="profile-element">
        <aside className="profile-edit-label-box">
          <label className="profile-edit-label">이메일</label>
        </aside>
        <div className="profile-edit-input-box">
          <input className="profile-edit-input"/>
        </div>
      </div>
      <button className="profile-edit-submit">제출</button>
    </div>
  )
}

export default BasicProfileEdit
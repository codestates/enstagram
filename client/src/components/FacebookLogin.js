import '../commonCss/login-signup.css'
import './FacebookLogin.css'
import Footer from './Footer'

function FacebookLogin({ userData, setIsLogin, setIsFbLogin }) {
  const username = userData.username;
  //const picture = null;

  return (
    <div>
      <div className="login-signup-container">
        <div className="login-signup-box box-1">
          <h1 className="logo">Enstagram</h1>
          <img 
            src="https://grepp-programmers.s3.amazonaws.com/files/production/10f4f72c93/1d932bfc-8082-4b7e-b30d-ab46bf71a9f2.png" 
            className="fblogin-profile-pic"
            alt="profile"
          />
          <button
            className="login-signup-button"
            type="submit"
            onClick={()=>setIsLogin(true)}
          >
            {username}님으로 계속
          </button>
          <span>
          {username}님이 아닌가요? {" "}
          <button 
            className="login-signup-link"
            onClick={()=>setIsFbLogin(false)} 
          >
            계정 변경
          </button>
        </span>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FacebookLogin
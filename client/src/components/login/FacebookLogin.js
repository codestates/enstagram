import '../../commonCss/login-signup.css'
import './FacebookLogin.css'
import Footer from '../Footer'

function FacebookLogin({ setIsLogin, facebookData, setWelcomeFB }) {

  function handleSetLogin() {
    setIsLogin(true)
    
  }

  return (
    <div>
      <div className="login-signup-container">
        <div className="login-signup-box box-1">
          <h1 className="logo">Enstagram</h1>
          <img 
            src={facebookData.url}
            className="fblogin-profile-pic"
            alt="profile"
          />
          <button
            className="login-signup-button"
            type="submit"
            onClick={handleSetLogin}
          >
            {facebookData.name}님으로 계속
          </button>
          <span>
          {facebookData.name}님이 아닌가요? {" "}
          <button 
            className="login-signup-link"
            onClick={()=>{setWelcomeFB(false)}} 
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
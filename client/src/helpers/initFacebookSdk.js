//const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
import {requestFacebookBasicProfile} from './accountService'

export default function initFacebookSdk() {
  return new Promise((resolve) => {
    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "205223094884729", // env 파일에 담기...?
        cookie: true,
        xfbml: true,
        version: "v11.0",
      });

      // facebook 에 로그인 되어있는지 체크
      window.FB.getLoginStatus((response) => {
        console.log(response);
        if (response.status === "connected") { // 로그인 되어있는 경우
          requestFacebookBasicProfile()
          .then(res => resolve(true))
        } 
        else { // 로그인 되어있지 않은 경우
          resolve(false);
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}

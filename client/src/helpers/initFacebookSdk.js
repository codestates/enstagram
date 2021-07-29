//const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
import * as accountService from './accountService'

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
        resolve();
      // window.FB.getLoginStatus((res) => {
      //   console.log(res)
      //   if (res.status === "connected") {
      //     accountService.requestFacebookBasicProfile()
      //     .then(resolve())
      //     //accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
      //   } else {
      //     resolve()
      //   }
      // });
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

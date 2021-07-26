export function requestFacebookLogin() {
  return new Promise((resolve) => {
    window.FB.login(async function (response) {
      if (response.authResponse) {
        console.log("Requesting Facebook login...");
        const profile = await requestFacebookBasicProfile()
        resolve(true); // 로그인 성공시
      } 
      else {
        console.log("User cancelled login or did not fully authorize.");
        resolve(false);
      }
    });
  })
}

export function requestFacebookBasicProfile() {
  return new Promise((resolve)=>{
    window.FB.api("/me", function (response) {
      console.log("Welcome, ", response.name, "!");
      resolve(response);
    });
  })
}

export function requestFacebookEmail() {
  return new Promise((resolve)=>{
    window.FB.api("/me", "GET", { fields: "email" }, function (response) {
      console.log("Requesting email from Facebook...");
      resolve(response);
    });
  })
}

export function requestFacebookProfilePic(userId) {
  return new Promise((resolve)=>{
    window.FB.api(
    `/${userId}/picture`,
    "GET",
    { redirect: "false", type: "large" },
    function (response) {
      console.log("Requesting profile picture from Facebook...");
      console.log(response);
      resolve(response);
    }
  );})
}

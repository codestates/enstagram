export function requestFacebookLogin() {
  return new Promise((resolve) => {
    window.FB.login(async function (response) {
      if (response.authResponse) {
        console.log("Requesting Facebook login...");
        const id = await requestFacebookBasicProfile()
        resolve(id); // 로그인 성공시
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
      resolve(response.id);
    });
  })
}

export function requestFacebookEmail() {
  return new Promise((resolve)=>{
    window.FB.api("/me", "GET", { fields: "email" }, function (res) {
      console.log("Requesting email from Facebook...");
      console.log(res);
      resolve({email: res.email, id: res.id});
    });
  })
}

export function requestFacebookProfilePic(id) {
  return new Promise((resolve)=>{
    window.FB.api(
    `/${id}/picture`,
    "GET",
    { redirect: "false", type: "large" },
    function (res) {
      console.log("Requesting profile picture from Facebook...");
      console.log(res);
      resolve(res.data.url);
    }
  );})
}

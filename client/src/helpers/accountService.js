import axios from "axios";

export function requestFacebookLogin() {
  return new Promise((resolve, reject) => {
    window.FB.login(function (response) {
      console.log("안뇽하세요오오오오오", response)
      if (response.authResponse) {
        console.log("You are logged into Facebook.");
        requestFacebookBasicProfile()
          .then(res => resolve(res))
      }
      else {
        console.log("User cancelled login or did not fully authorize.");
        resolve(false);
      }
    },{scope: 'email',return_scopes: true});  
  })
}

export function checkFacebookLogin() {
  return new Promise(resolve => {
    console.log('Checking your facebook login status...')
    window.FB.getLoginStatus((res) => {
      console.log(res)
      if (res.status === "connected") {
        console.log("You are logged into Facebook.")
        resolve(true)
      } else {
        console.log("You are not logged into Facebook.")
        resolve(false)
      }
    });
  })
}

function requestFacebookBasicProfile() {
  return new Promise((resolve)=>{
    window.FB.api("/me", function (response) {
      console.log(response)
      console.log("Welcome, ", response.name, "!");
      resolve(response);
    });
  })
}

export function requestFacebookEmail() {
  return new Promise((resolve) => {
    window.FB.api("/me", "GET", { fields: "email" }, function (res) {
      console.log("Requesting email from Facebook...");
      console.log(res);
      resolve(res);
    });
  })
}

export async function checkEmail(email) {
  console.log("Checking the Facebook email from database...");
  const res = await axios.get(`https://www.fpserver.click/oauth?email=${email}`);
  console.log("Result from the database: ", res);
  if (!res) {
    console.log('이메일 체크 서버 요청 실패')
    return "fail";
  };
  if (res.data.message === "로그인 성공") {
    // 이미 회원가입 했음을 확인
    console.log("You already signed up on Enstagram.");
    return {userdata: res.data.data };
  } 
  else {
    console.log("You have not signed up on Enstagram.");
    return false;
  }
}

export function requestFacebookProfilePic(id) {
  return new Promise((resolve) => {
    window.FB.api(
      `/${id}/picture`,
      "GET",
      { redirect: "false", type: "large" },
      function (res) {
        console.log("Requesting profile picture from Facebook...");
        console.log(res);
        resolve(res.data.url);
      }
    );
  })
}

require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const controllers = require("./controllers");

//? JSON 형식의 파일 사용
app.use(express.json());
const port = process.env.PORT || 4000;

//? CORS 설정
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

//? 쿠키 사용
app.use(cookieParser());

//! GET 요청
app.get('/', controllers.test);
app.get('/accessToken', controllers.accessToken);
app.get('/refreshToken', controllers.refreshToken);
app.get('/oauth', controllers.OAuth);
app.get('/getpost', controllers.getPosts);
app.get('/getcomment', controllers.getComments);
app.get('/getlike', controllers.getLike);
app.get('/getuser', controllers.getUserInfo);
app.get('/getfollower', controllers.getFollower);
app.get('/getfollowing', controllers.getFollowing);
app.get('/getmainpage', controllers.getMainPage);

//! POST 요청
app.post('/login', controllers.login);
app.post('/logout', controllers.logout);
app.post('/signup', controllers.signup);
app.post('/createpost', controllers.createPosts);
app.post('/createcomment', controllers.createComments);
app.post('/like', controllers.like);
app.post('/follow', controllers.follow);

//! PUT 요청
app.put('/edituserinfo', controllers.editUserInfo);
app.put('/editpassword', controllers.editPassword);
app.put('/editprofilephoto', controllers.editProfilephoto);

//! DELETE 요청
app.delete('/deletecomment', controllers.deleteComments);

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
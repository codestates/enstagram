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

//! POST 요청
app.post('/', controllers.login);
app.post('/signup', controllers.signup);
app.post('/createpost', controllers.createPosts);

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
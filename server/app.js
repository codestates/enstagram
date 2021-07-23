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

//Test

//? 쿠키 사용
app.use(cookieParser());

app.get('/', controllers.test);
app.get('/2', controllers.test2);
app.post('/', controllers.login);
app.post('/signup', controllers.signup);
app.get('/accessToken', controllers.accessToken);
app.get('/refreshToken', controllers.refreshToken);

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
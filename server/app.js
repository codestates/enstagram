require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const controllers = require("./controllers");

app.use(express.json());
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.get('/', controllers.test);
app.post('/signup', controllers.signup);
app.post('/login', controllers.login);

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
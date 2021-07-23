require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const controllers = require("./controllers");

app.use(express.json());
let PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.get('/', controllers.test);
app.post('/signup', controllers.signup);

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {

  PORT = 443;

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log("server runnning"));

} else {
  server = app.listen(PORT)
}

module.exports = server;
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();

const HTTPS_PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("server runnning"));

} else {
  server = app.listen(HTTPS_PORT)
}

module.exports = server;
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/connection');

app.use(express.json());
const port = 80;

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.get('/', (req, res) => {

  db.query('create table test(id, name)', (err, res) => {
    console.log("result:", res);
  });

  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});

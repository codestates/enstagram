const express = require('express');
const app = express();
const db = require('./db/connection');

app.use(express.json());
const port = 80;

app.get('/', (req, res) => {

  db.query('use test', (err, result) => {

    if (result) {
      return res.status(201).send("DB Connect Success!");
    }
  });

  return res.status(201).send("DB Connect Fail!");
});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});

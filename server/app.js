const express = require('express');
const app = express();
const db = require('./db/connection');

app.use(express.json());
const port = 80;

app.get('/', (req, res) => {

  db.query('use test', (err, result) => {
    result.query('create table name(id INT, name STRING)', (err2, result2) => {
      if (err2) {
        return res.status(201).send("DB Connect Fail");
      }

      console.log("result2 에는 뭐가 들어갔죠??", result2);
    });
  });

  return res.status(201).send("DB Connect Success!");

});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});

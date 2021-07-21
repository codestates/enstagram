const express = require('express');
const app = express();
const db = require('./db/connection');

app.use(express.json());
const port = 80;

app.get('/', (req, res) => {

  db.query('use test', (err) => {

    var sql = "CREATE TABLE name (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";

    db.query(sql, (err) => {
      if (err) {
        return res.status(200).send("DB Connect Fail!");
      }
    })
  });

  return res.status(201).send("DB Connect Success!");

});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});

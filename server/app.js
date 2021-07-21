const express = require('express');
const app = express();

app.use(express.json());
const port = 4000;

app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});

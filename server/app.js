const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
const port = 4000;

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});

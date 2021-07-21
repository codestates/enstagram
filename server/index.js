const express = require("express");
const app = express();
const db = require('./db/connection');

const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

db.query('use test', (err) => {
  if (err) {
    return res.status(400).send("DB connect Error!!");
  }

  return res.status(200).send("DB connect Success!!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
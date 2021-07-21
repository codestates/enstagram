const express = require("express");
const app = express();
const PORT = precess.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
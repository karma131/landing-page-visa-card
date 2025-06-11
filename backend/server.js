// backend/server.js
// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/api/hello', (req, res) => {
//   res.json({ message: "Hello karma from backend!" });
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Backend running at http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/auth"));
app.use("/api/apply", require("./routes/apply"));

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});




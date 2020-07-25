require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`this will happen ${port} times, and i will get up 3001 times`);
});

module.exports = app;

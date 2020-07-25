const express = require("express");
const PORT = process.env.PORT || 3000;
const router = require("./routers");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`NOW RUNNING ON PORT ${PORT}`);
});

module.exports = app;

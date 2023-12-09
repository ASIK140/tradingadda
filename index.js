const express = require("express");
require("dotenv").config();
const cookie = require("cookie-parser");
const users = require("./src/Routes/UserRouter");
const feedback = require("./src/Routes/FeedBack");
const errormiddleware = require("./src/Middleware/Error");
const bodyParser = require("body-parser");
const db_Connection = require("./src/Config/Database");
const admin = require("./src/Routes/AdminRouter");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: [
      "https://www.tradingaddaacademy.in",
      "https://tradingaddaacademy.in",
      "http://www.tradingaddaacademy.in",
      "http://tradingaddaacademy.in",
    ],
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookie());
const PORT = process.env.PORT;
app.use("/api/v1", users);
app.use("/api/v1", feedback);
app.use("/api/v1", admin);

app.use(errormiddleware);
db_Connection();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

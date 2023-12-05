const mongo = require("mongoose");
const uri = process.env.DB_URI;
const db_Connection = () => {
  mongo
    .connect(uri)
    .then(() => {
      console.log(`Database connected with server:${uri} `);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = db_Connection;

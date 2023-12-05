const mongo = require("mongoose");

const feedBackSchema = new mongo.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Comment: {
    type: String,
  },
});

module.exports = mongo.model("feedBack", feedBackSchema);

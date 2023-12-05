const mongo = require("mongoose");

const NewsSchema = new mongo.Schema({
  Title: {
    type: String,
  },
  Url: {
    type: String,
  },
  Description: {
    type: String,
  },
});

module.exports = mongo.model("news", NewsSchema);

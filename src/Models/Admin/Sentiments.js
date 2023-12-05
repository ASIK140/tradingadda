const mongo = require("mongoose");

const SentimentSchema = new mongo.Schema({
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

module.exports = mongo.model("sentiments", SentimentSchema);

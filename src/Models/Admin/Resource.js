const mongo = require("mongoose");

const ResourceSchema = new mongo.Schema({
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

module.exports = mongo.model("resource", ResourceSchema);

const mongo = require("mongoose");

const DexSchema = new mongo.Schema({
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

module.exports = mongo.model("dexsignals", DexSchema);

const { model, Schema } = require("mongoose");

let warning = new Schema({
  UserID: { type: String, required: true },
  Counter: { type: Number, required: true },
});

module.exports = model("warning", warning);

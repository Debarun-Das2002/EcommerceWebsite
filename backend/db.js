const mongoose = require("mongoose");

function connectTodb(x) {
  mongoose.connect(x);
}

module.exports = { connectTodb };

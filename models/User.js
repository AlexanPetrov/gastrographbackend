const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: false, unique: true, sparse: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

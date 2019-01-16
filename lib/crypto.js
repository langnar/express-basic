const crypto = require("crypto");

const secret = "bctvgf";

const hash = pass =>
  crypto
    .createHash("sha256", secret)
    .update(pass)
    .digest("hex");

module.exports = hash;

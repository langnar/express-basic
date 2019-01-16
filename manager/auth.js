const { Users } = require("../model/products");
const hash = require("../lib/crypto");

const createUser = user =>
  Users.forge().save({ ...user, password: hash(user.password) });

const loginUser = user =>
  Users.query(qb => {
    qb.where("email", user.email);
    qb.where("password", hash(user.password));
  }).fetch();

module.exports = { createUser, loginUser };

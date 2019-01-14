const pgp = require("pg-promise")();

let db = false;

const getConnection = () => {
  const cn = "postgres://postgres:12345@localhost:5432/testdb";
  if (!db) {
    db = pgp(cn);
  }
  return db;
};
module.exports = { getConnection };

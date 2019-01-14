const { getConnection } = require("../lib/db");

const db = getConnection();

const getProducts = (offset, limit) => {
  return db.any(
    `select * from products inner join description on products.id = description.id order by products.id offset ${offset} limit ${limit}`
  );
};

const getProductById = id => {
  return db.one(
    `select * from products inner join description on products.id = description.id where products.id = ${id}`
  );
};

module.exports = { getProducts, getProductById };

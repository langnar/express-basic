var knex = require("knex")({
  client: "pg",
  connection: "postgres://postgres:12345@localhost:5432/testdb",
  searchPath: ["knex", "public"]
});

let bookshelf = require("bookshelf")(knex);
bookshelf.plugin("pagination");

const Products = bookshelf.Model.extend({
  tableName: "products"
});

const Description = bookshelf.Model.extend({
  tableName: "description"
});

module.exports = { Products, Description };

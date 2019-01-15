const { getConnection } = require("../lib/db");

const db = getConnection();

const getProducts = (offset, limit) => {
  return db.any(
    `select p.id, p.name, p.singer, p.price, d.description from products p left join description d on p.id = d.id order by p.id offset ${offset} limit ${limit}`
  );
};

const getProductById = id => {
  return db.one(
    `select * from products left join description on products.id = description.id where products.id = ${id}`
  );
};

const countProducts = () => {
  return db.one(`select count(id) from products`);
};

const insertProduct = product => {
  return db.one(
    `with ins_prod_id as ( 
      insert into products (name, singer, price) values ($1, $2, $3) returning id
      )
      insert into description (id, description) values ((select id from ins_prod_id), $4) returning id;
      `,
    [product.name, product.singer, product.price, product.description]
  );
};

const deleteProducts = id => {
  return db.one(`delete from products where id = $1 returning id`, [id]);
};

const updateProducts = (id, product) => {
  return db.one(
    `
  with update_prod as (
    update products set name = $1, singer = $2, price = $3 where id = ${id} returning id
  )
  update description set description = $4 where id = (select id from update_prod) returning id
  `,
    [product.name, product.singer, product.price, product.description]
  );
};

module.exports = {
  getProducts,
  getProductById,
  countProducts,
  insertProduct,
  deleteProducts,
  updateProducts
};

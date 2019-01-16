const { Products, Description } = require("../model/products");

const getProducts = (offset, limit) => {
  return Products.query(qb => {
    qb.select("*").innerJoin("description", "products.id", "description.id");
  })
    .orderBy("id")
    .fetchPage({ limit, offset });
};

const getProductById = id => {
  return Products.query(qb => {
    qb.select("*").innerJoin("description", "products.id", "description.id");
    qb.where("products.id", id);
  }).fetch();
};

const insertProduct = product =>
  Products.forge({
    name: product.name,
    singer: product.category,
    price: product.price
  })
    .save()
    .then(res =>
      Description.forge().save({ id: res.id, description: product.description })
    );

const deleteProducts = id => Products.where("id", id).destroy();

const updateProduct = (id, product) =>
  Products.forge()
    .where("id", id)
    .save(
      {
        name: product.name,
        singer: product.category,
        price: product.price
      },
      { method: "update" }
    )
    .then(() =>
      Description.forge()
        .where("id", id)
        .save({ description: product.description }, { method: "update" })
    );

// const updateProducts = (id, product) => {
//   return model.updateProducts(id, product);
// };

module.exports = {
  getProducts,
  getProductById,
  insertProduct,
  deleteProducts,
  updateProduct
};

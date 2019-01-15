const model = require("../model/products");

const getProducts = (offset, limit) => {
  return model.getProducts(offset, limit);
};

const getProductById = id => {
  return model.getProductById(id);
};

const countProducts = () => {
  return model.countProducts();
};

const insertProduct = product => {
  return model.insertProduct(product);
};

const deleteProducts = id => {
  return model.deleteProducts(id);
};

const updateProducts = (id, product) => {
  return model.updateProducts(id, product);
};

module.exports = {
  getProducts,
  getProductById,
  countProducts,
  insertProduct,
  deleteProducts,
  updateProducts
};

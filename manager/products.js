const model = require("../model/products");

const getProducts = (offset, limit) => {
  return model.getProducts(offset, limit);
};

const getProductById = id => {
  return model.getProductById(id);
};

module.exports = { getProducts, getProductById };

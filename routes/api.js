const express = require("express");
const router = express.Router();
const db = require("../db.json");
const productManager = require("../manager/products");

router.get("/discs", function(req, res, next) {
  // res.set({ "X-Total-Count": db.discs.length });
  // const limit = req.query["_limit"];
  // const page = req.query["_page"];
  // let sendData;
  // if (page) {
  //   if (limit) {
  //     let start = limit * page - limit;
  //     let end = limit * page;
  //     sendData = db.discs.slice(start, end);
  //   } else {
  //     sendData = db.discs;
  //   }
  // } else {
  //   sendData = db.discs.slice(0, limit);
  // }
  const limit = req.query["_limit"] || 6;
  const page = req.query["_page"] || 1;
  const offset = limit * page - limit;
  productManager.getProducts(offset, limit).then(result => res.json(result));
});

router.param("id", (req, res, next, id) => {
  productManager
    .getProductById(id)
    .then(product => {
      res.product = product;
      next();
    })
    .catch(e => next(e));
});

router.get("/discs/:id", (req, res, next) => {
  res.send(res.product);
});
module.exports = router;

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

  productManager
    .countProducts()
    .then(el => res.set({ "X-Total-Count": Number(el.count) }));
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

router.post("/discs", (req, res, next) => {
  productManager
    .insertProduct(req.body)
    .then(el => res.send("Add element " + el.id));
});

router.delete("/discs/:id", (req, res, next) => {
  productManager
    .deleteProducts(req.params.id)
    .then(el => res.send("Deleted element " + el.id))
    .catch(e => next(e));
});

router.patch("/discs/:id", (req, res, next) => {
  productManager
    .updateProducts(req.params.id, req.body)
    .then(el => res.send("Update element " + el.id))
    .catch(e => next(e));
});
module.exports = router;

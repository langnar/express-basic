const express = require("express");
const router = express.Router();
const authManager = require("../manager/auth");

const isAuth = (req, res, next) => {
  if (req.session.token) {
    console.log(req.session.token);
    next();
  } else {
    console.log(req.session.token);
    res.redirect("../login");
  }
};

router.post("/registration", (req, res, next) => {
  authManager
    .createUser(req.body)
    .then(() => res.redirect("../login"))
    .catch(e => next(e));
});

router.post("/login", (req, res, next) => {
  authManager
    .loginUser(req.body)
    .then(result => {
      req.session.token = req.sessionID;
      console.log(req.session.token);

      return result ? res.redirect("/") : res.send("Error");
    })
    .catch(e => next(e));
});

router.get("/logout", (req, res, next) => {
  console.log("before logout ", req.session.token);
  req.session.token = null;
  console.log("after logout ", req.session.token);
  res.redirect("/");
});

router.get("/secretpage", isAuth, (req, res, next) => {
  res.send("welcome to secretiki");
});

module.exports = router;

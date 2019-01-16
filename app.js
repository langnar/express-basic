var createError = require("http-errors");
var express = require("express");
var path = require("path");
const genuuid = require("uuid");
var logger = require("morgan");
const session = require("express-session");

var apiRouter = require("./routes/api");
var authRouter = require("./routes/auth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    genid: () => genuuid(),
    secret: "helpme",
    resave: false,
    saveUninitialized: true
  })
);

app.use("/assets", express.static(path.join(__dirname, "public")));
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;

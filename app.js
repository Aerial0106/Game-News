var express = require("express");
var app = express();

var controller = require(__dirname  + "/apps/controllers");
app.use(controller);

app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");
app.use("/partical", express.static(__dirname + "/views/partical"));

var server = app.listen(3000, function()
{
    console.log("server is running");
});
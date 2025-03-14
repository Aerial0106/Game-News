var express = require("express");
var app = express();
var controller = require(__dirname  + "/apps/controllers");
app.use(controller);
var server = app.listen(3000, function()
{
    console.log("server is running");
});

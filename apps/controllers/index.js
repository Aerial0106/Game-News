var express = require('express');
var router = express.Router();

router.use("/home", require(__dirname + "/HomeController"));

router.get("/", function (req, res) {
    res.render('index.ejs');
});
module.exports = router;
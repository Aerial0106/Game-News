var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    router.use("/categories", require(__dirname + "/CategoriesController"));
    res.render('categories.ejs');
});
module.exports = router;
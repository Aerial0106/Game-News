var express = require('express');
var router = express.Router();

router.use("/home", require(__dirname + "/HomeController"));
router.use("/contact", require(__dirname + "/ContactController"));
router.use("/single-blog", require(__dirname + "/SingleBlogController"));
router.use("/review", require(__dirname + "/ReviewController"));
router.use("/categories", require(__dirname + "/CategoriesController"));

router.get("/", function (req, res) {
    res.render('index.ejs');
});
module.exports = router;
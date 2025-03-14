var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    router.use("/single-blog", require(__dirname + "/SingleBlogController"));
    res.render('single-blog.ejs');
});
module.exports = router;
var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    router.use("/review", require(__dirname + "/ReviewController"));
    res.render('review.ejs');
});
module.exports = router;
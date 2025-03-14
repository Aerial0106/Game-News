var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    router.use("/contact", require(__dirname + "/ContactController"));
    res.render('contact.ejs');
});
module.exports = router;
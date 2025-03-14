var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    router.use("/community", require(__dirname + "/CommunityController"));
    res.render('community.ejs');
});
module.exports = router;
var express = require("express");
var router = express.Router();

router.use("/", function(req,res){
    res.render('admin/sidebarlayout/icon-menu.ejs');
});
module.exports = router;
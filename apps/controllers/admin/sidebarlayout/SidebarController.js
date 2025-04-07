var express = require("express");
var router = express.Router();

router.use("/", function(req,res){
    res.render('admin/sidebarlayout/sidebar-style-2.ejs');
});
module.exports = router;
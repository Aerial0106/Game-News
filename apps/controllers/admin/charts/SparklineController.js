var express = require("express");
var router = express.Router();

router.use("/", function(req,res){
    res.render('admin/charts/sparkline.ejs');
});
module.exports = router;
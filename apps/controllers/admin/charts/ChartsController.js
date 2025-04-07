var express = require("express");
var router = express.Router();

router.use("/", function(req,res){
    res.render('admin/charts/charts.ejs');
});
module.exports = router;
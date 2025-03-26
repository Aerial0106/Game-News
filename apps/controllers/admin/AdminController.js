var express = require("express");
var router = express.Router();

// var User = require("../../model/user")

router.use("/", function(req,res){
    res.render('admin/admin.ejs');
});

// router.get("/user", function(req,res){
//     res.render("admin/userManage"); 
// });

module.exports = router;

// router.get("/getuserlist", function(req,res){
//     var userList = new Array();
//     for(var i = 0; i< 10;i++){
//         var us = new User();
//         us.id = (i+1);
//         us.name = "name " + (i+1);
//         userList.push(us);
//     }
//     res.json(userList);
// });
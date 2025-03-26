var express = require('express');
var router = express.Router();

router.use("/home", require(__dirname + "/HomeController"));
router.use("/contact", require(__dirname + "/ContactController"));
router.use("/single-blog", require(__dirname + "/SingleBlogController"));
router.use("/review", require(__dirname + "/ReviewController"));
router.use("/categories", require(__dirname + "/CategoriesController"));
router.use("/community", require(__dirname + "/CommunityController"));

//Admin
router.use("/admin", require(__dirname + "/admin/AdminController"));
router.use("/widgets", require(__dirname + "/admin/Widgetscontroller"));
router.use("/forms", require(__dirname + "/admin/Formscontroller"));
router.use("/sidebar-style-2", require(__dirname + "/admin/sidebarlayout/SidebarController"));
router.use("/sidebar-style-2", require(__dirname + "/admin/sidebarlayout/Icon-menuController"));
router.use("/charts", require(__dirname + "/admin/charts/Chartscontroller"));
router.use("/sparkline", require(__dirname + "/admin/charts/Sparklinecontroller"));

router.get("/", function (req, res) {
    res.render('index.ejs');
});
module.exports = router;
var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');

router.use("/home", require(__dirname + "/HomeController"));
router.use("/contact", require(__dirname + "/ContactController"));
router.use("/single-blog", require(__dirname + "/SingleBlogController"));
router.use("/review", require(__dirname + "/ReviewController"));
router.use("/categories", require(__dirname + "/CategoriesController"));
router.use("/community", require(__dirname + "/CommunityController"));

//Admin
router.use("/admin", require(__dirname + "/admin/AdminController"));
router.use("/widgets", require(__dirname + "/admin/WidgetsController"));
router.use("/forms", require(__dirname + "/admin/Formscontroller"));
router.use("/sidebar-style-2", require(__dirname + "/admin/sidebarlayout/SidebarController"));
router.use("/icon-menu", require(__dirname + "/admin/sidebarlayout/Icon-menuController"));
router.use("/charts", require(__dirname + "/admin/charts/Chartscontroller"));
router.use("/sparkline", require(__dirname + "/admin/charts/Sparklinecontroller"));

router.get('/auth/register', AuthController.showRegister);
router.post('/auth/register', AuthController.register);
router.get('/auth/login', AuthController.showLogin);
router.post('/auth/login', AuthController.login);
router.get('/auth/logout', AuthController.logout);

router.get("/", function (req, res) {
    res.render('index.ejs');
});
module.exports = router;
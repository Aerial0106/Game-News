require('dotenv').config();
var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');
const jwt = require('jsonwebtoken');

// Kiểm tra import User
let User;
try {
  User = require('../../models/user');
} catch (error) {
  console.error('Error loading User model:', error.message);
  User = null;
}

// Middleware để kiểm tra và decode JWT
router.use(async (req, res, next) => {
  const token = req.cookies.token;
  console.log('Token from cookie:', token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        res.locals.username = null;
        return next();
      }
      res.locals.username = user.username;
      res.locals.role = user.role; // Lưu role vào res.locals
      console.log('User role:', user.role);
      next();
    } catch (error) {
      console.error('Error verifying token:', error.message);
      res.locals.username = null;
      res.locals.role = null;
      next();
    }
  } else {
    res.locals.username = null;
    res.locals.role = null;
    next();
  }
});

// Middleware kiểm tra admin
const isAdmin = (req, res, next) => {
  if (res.locals.role === 'admin') {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

// Áp dụng middleware cho các route admin
router.use("/admin", isAdmin, require(__dirname + "/admin/AdminController"));
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
router.use("/admin", require(__dirname + "/admin/AdminController"));



router.get('/auth/register', AuthController.showRegister);
router.post('/auth/register', AuthController.register);
router.get('/auth/login', AuthController.showLogin);
router.post('/auth/login', AuthController.login);
router.get('/auth/logout', AuthController.logout);

router.get("/", function (req, res) {
  res.render('index.ejs');
});

module.exports = router;
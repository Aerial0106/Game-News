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
      console.log('Decoded token:', decoded);
      if (!User) {
        console.log('User model not available');
        res.locals.username = null;
        return next();
      }
      // Sử dụng async/await thay vì callback
      const user = await User.findById(decoded.id);
      if (!user) {
        console.log('User not found for ID:', decoded.id);
        res.locals.username = null;
      } else {
        console.log('User found:', user);
        res.locals.username = user.username;
      }
      console.log('res.locals.username:', res.locals.username);
      next();
    } catch (error) {
      console.error('Error verifying token:', error.message);
      res.locals.username = null;
      next();
    }
  } else {
    console.log('No token found in cookie');
    res.locals.username = null;
    next();
  }
});

router.use("/home", require(__dirname + "/HomeController"));
router.use("/contact", require(__dirname + "/ContactController"));
router.use("/single-blog", require(__dirname + "/SingleBlogController"));
router.use("/review", require(__dirname + "/ReviewController"));
router.use("/categories", require(__dirname + "/CategoriesController"));
router.use("/community", require(__dirname + "/CommunityController"));

router.get('/auth/register', AuthController.showRegister);
router.post('/auth/register', AuthController.register);
router.get('/auth/login', AuthController.showLogin);
router.post('/auth/login', AuthController.login);
router.get('/auth/logout', AuthController.logout);

router.get("/", function (req, res) {
  res.render('index.ejs');
});

module.exports = router;
const path = require('path');
const express = require("express");
const app = express();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Kết nối database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cấu hình views và static files
app.set("views", path.join(__dirname, "apps/views"));
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/partical", express.static(path.join(__dirname, "apps/views/partical")));

// Routes
const singleBlogRouter = require('./apps/controllers/SingleBlogController');
app.use('/single-blog', singleBlogRouter);

// Load các controller khác
const controller = require('./apps/controllers');
app.use(controller);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
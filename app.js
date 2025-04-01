var express = require("express");
var app = express();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser'); // Thêm cookie-parser để xử lý token

// Gọi hàm kết nối cơ sở dữ liệu
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Thêm middleware để xử lý cookie
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cấu hình views và static files
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));
app.use("/partical", express.static(__dirname + "/views/partical"));

// Load controllers
var controller = require(__dirname + "/apps/controllers");
app.use(controller);

// Khởi động server
var server = app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
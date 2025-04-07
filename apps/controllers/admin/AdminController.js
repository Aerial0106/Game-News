var express = require("express");
var router = express.Router();
const User = require('../../../models/user');
const bcrypt = require('bcrypt');

// Hiển thị trang quản lý người dùng
router.get("/user", async (req, res) => {
  try {
    const users = await User.find().select('username email createdAt');
    res.render("admin/userManage", { users, error: null }); // Truyền error: null khi không có lỗi
  } catch (error) {
    console.error('Error fetching users:', error);
    res.render("admin/userManage", { users: [], error: 'Không thể tải danh sách người dùng' });
  }
});

// Lưu người dùng (thêm hoặc sửa)
router.post("/save-user", async (req, res) => {
  const { userId, username, email, password } = req.body;
  try {
    if (userId) {
      // Cập nhật người dùng
      const updateData = { username, email };
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }
      await User.findByIdAndUpdate(userId, updateData);
      console.log('User updated:', { userId, username, email });
    } else {
      // Thêm người dùng mới
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render('admin/userManage', {
          users: await User.find().select('username email createdAt'),
          error: 'Email đã được sử dụng'
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      console.log('User created:', newUser);
    }
    res.redirect('/admin/user');
  } catch (error) {
    console.error('Error saving user:', error);
    res.render('admin/userManage', {
      users: await User.find().select('username email createdAt'),
      error: 'Đã có lỗi xảy ra khi lưu tài khoản'
    });
  }
});

// Xóa người dùng
router.get("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log('User deleted:', req.params.id);
    res.redirect('/admin/user');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.render('admin/userManage', {
      users: await User.find().select('username email createdAt'),
      error: 'Đã có lỗi xảy ra khi xóa tài khoản'
    });
  }
});

// Trang admin dashboard
router.get("/", function (req, res) {
  res.render('admin/admin.ejs');
});

module.exports = router;
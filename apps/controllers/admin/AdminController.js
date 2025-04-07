var express = require("express");
var router = express.Router();
const User = require('../../../models/user');
const Blog = require('../../../models/blog');
const bcrypt = require('bcrypt');

// Hiển thị trang quản lý người dùng
router.get("/user", async (req, res) => {
  try {
    const users = await User.find().select('username email createdAt');
    res.render("admin/userManage", { users, error: null });
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
      const updateData = { username, email };
      if (password) updateData.password = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(userId, updateData);
      console.log('User updated:', { userId, username, email });
    } else {
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

// Hiển thị trang quản lý bài viết
router.get("/post", async (req, res) => {
  try {
    const posts = await Blog.find().populate('author', 'username');
    const users = await User.find().select('username');
    res.render("admin/postManage", { posts, users, error: null, success: null });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.render("admin/postManage", { posts: [], users: [], error: 'Không thể tải danh sách bài viết', success: null });
  }
});

// Lưu bài viết (thêm hoặc sửa)
router.post("/save-post", async (req, res) => {
  const { postId, title, content1, content2, content3, author, category, imageUrl, imageUrl2 } = req.body;
  try {
    const authorExists = await User.findById(author);
    if (!authorExists) {
      const posts = await Blog.find().populate('author', 'username');
      const users = await User.find().select('username');
      return res.render("admin/postManage", { posts, users, error: 'Tác giả không tồn tại', success: null });
    }

    if (postId) {
      await Blog.findByIdAndUpdate(postId, {
        title,
        content1,
        content2: content2 || '',
        content3: content3 || '',
        author,
        category: category || '',
        imageUrl: imageUrl || '',
        imageUrl2: imageUrl2 || ''
      });
      console.log('Post updated:', { postId, title });
    } else {
      const newPost = new Blog({
        title,
        content1,
        content2: content2 || '',
        content3: content3 || '',
        author,
        category: category || '',
        imageUrl: imageUrl || '',
        imageUrl2: imageUrl2 || ''
      });
      await newPost.save();
      console.log('Post created:', newPost);
    }
    const posts = await Blog.find().populate('author', 'username');
    const users = await User.find().select('username');
    res.render("admin/postManage", { posts, users, error: null, success: 'Lưu bài viết thành công' });
  } catch (error) {
    console.error('Error saving post:', error);
    const posts = await Blog.find().populate('author', 'username');
    const users = await User.find().select('username');
    res.render("admin/postManage", { posts, users, error: 'Đã có lỗi xảy ra khi lưu bài viết', success: null });
  }
});

// Xóa bài viết
router.get("/delete-post/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    console.log('Post deleted:', req.params.id);
    res.redirect('/admin/post');
  } catch (error) {
    console.error('Error deleting post:', error);
    const posts = await Blog.find().populate('author', 'username');
    const users = await User.find().select('username');
    res.render("admin/postManage", { posts, users, error: 'Đã có lỗi xảy ra khi xóa bài viết', success: null });
  }
});

// Trang admin dashboard
router.get("/", function (req, res) {
  res.render('admin/admin.ejs');
});

module.exports = router;
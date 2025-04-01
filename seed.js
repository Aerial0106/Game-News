// seed.js
const mongoose = require('mongoose');
const User = require('./models/user');
const Blog = require('./models/blog');
const bcrypt = require('bcryptjs');

// Kết nối database (phiên bản mới)
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/game-news');
    console.log('Connected to MongoDB');
    return true;
  } catch (err) {
    console.error('Connection error:', err);
    return false;
  }
}

// Hàm tạo dữ liệu mẫu
async function seedDatabase() {
  try {
    // Xóa dữ liệu cũ (nếu cần)
    await User.deleteMany({});
    await Blog.deleteMany({});
    
    // Tạo user mẫu với password đã hash
    const salt = await bcrypt.genSalt(10);
    const demoPassword = await bcrypt.hash('user123', salt);
    const adminPassword = await bcrypt.hash('admin123', salt);
    
    const demoUser = new User({
      username: 'gamefan',
      email: 'gamefan@example.com',
      password: demoPassword,
      role: 'user'
    });
    
    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });
    
    const savedUsers = await User.insertMany([demoUser, adminUser]);
    
    // Tạo bài viết mẫu
    const sampleBlogs = [
      {
        title: 'Review Elden Ring - Tựa game đáng chơi nhất 2022',
        content: 'Nội dung review chi tiết về Elden Ring...',
        author: savedUsers[0]._id,
        category: 'Review',
        imageUrl: '/images/elden-ring.jpg',
        views: 0,
        comments: [{
          user: savedUsers[1]._id,
          text: 'Bài review rất chi tiết!',
          createdAt: new Date()
        }]
      },
      {
        title: 'Hướng dẫn chơi Valorant cho người mới',
        content: 'Các tips và tricks cơ bản khi chơi Valorant...',
        author: savedUsers[1]._id,
        category: 'Hướng dẫn',
        imageUrl: '/images/valorant.jpg',
        views: 0,
        comments: [{
          user: savedUsers[0]._id,
          text: 'Rất hữu ích cho người mới như mình!',
          createdAt: new Date()
        }]
      }
    ];
    
    await Blog.insertMany(sampleBlogs);
    
    console.log('Dữ liệu mẫu đã được thêm thành công!');
    return true;
  } catch (err) {
    console.error('Lỗi khi thêm dữ liệu mẫu:', err);
    return false;
  }
}

// Chạy chương trình
(async () => {
  if (await connectDB()) {
    await seedDatabase();
    mongoose.connection.close();
  }
  process.exit(0);
})();
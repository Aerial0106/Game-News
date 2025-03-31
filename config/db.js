const mongoose = require('mongoose');

// URL kết nối MongoDB (thay đổi nếu dùng MongoDB Atlas)
const url = 'mongodb://localhost:27017/game_news'; // game_news là tên database

// Hàm kết nối
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Kết nối thành công tới MongoDB!');
  } catch (error) {
    console.error('Lỗi khi kết nối tới MongoDB:', error);
    process.exit(1); // Thoát nếu không kết nối được
  }
};

module.exports = connectDB;
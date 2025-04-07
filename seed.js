async function seedDatabase() {
  try {
    // Kết nối MongoDB (nếu chưa kết nối)
    const mongoose = require('mongoose');
    const User = require('./models/User'); // Import model User
    const Blog = require('./models/Blog'); // Import model Blog
    
    await mongoose.connect('mongodb://localhost:27017/game-news', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // 🔹 Tìm tất cả user trong database
    const savedUsers = await User.find(); // Lấy tất cả user trong DB

    // Kiểm tra nếu không có user nào
    if (savedUsers.length < 2) {
      console.error("Cần ít nhất 2 user trong database để tiếp tục!");
      return;
    }

    console.log("Danh sách users:", savedUsers);

    // 🔹 Tạo bài viết với user có sẵn
    const sampleBlogs = [
      {
        title: ' "Elden Ring: Nightreign là một bản spin-off chơi co-op độc lập"',
        content1: 'Nhà phát triển FromSoftware và nhà phát hành Bandai Namco đã chính thức công bố Elden Ring: Nightreign – một tựa game spin-off chơi phối hợp độc lập, lấy bối cảnh trong một thế giới song song với Elden Ring phát hành năm 2022.',
        content2: 'Từ đó, người chơi sẽ phải nhanh chóng tiêu diệt các trại địch và tìm kiếm vũ khí mạnh hơn, để khi màn đêm buông xuống, họ có cơ hội sống sót cao hơn trước những trận chiến trùm đầy thử thách. Nếu người chơi sống sót được trong ba ngày trong game, họ sẽ phải đối mặt với một con trùm lớn. Tổng cộng sẽ có tám trùm lớn mà người chơi cần tìm kiếm và chinh phục trong trò chơi.',
        content3: 'Được thiết kế để phù hợp với cả người chơi kỳ cựu lẫn người mới, Elden Ring: Nightreign mang đến danh sách 8 nhân vật có thể điều khiển, mỗi nhân vật sở hữu kỹ năng riêng biệt và đòn tấn công tối thượng độc đáo. Nightreign là một game nhập vai dạng "chơi theo phiên" (session-based RPG), hướng đến trải nghiệm trực tuyến với tối đa 3 người chơi, tuy nhiên chế độ chơi đơn cũng sẽ được hỗ trợ.',
        author: savedUsers[1]._id, // Lấy _id của user thứ 2
        category: 'Tin hot',
        imageUrl: '/static/img/recent-game/3.png',
        imageUrl2: '/static/img/recent-game/3.1.png',
        views: 0,
        comments: [{
          user: savedUsers[0]._id, // Lấy _id của user thứ 1
          text: 'Rất đáng mong đợi nha bro.',
          createdAt: new Date()
        }]
      }
    ];

    // 🔹 Chèn bài viết vào database
    await Blog.insertMany(sampleBlogs);
    console.log('Dữ liệu mẫu đã được thêm thành công!');

  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu mẫu:', error);
  } finally {
    mongoose.connection.close(); // Đóng kết nối sau khi xong
  }
}

seedDatabase();

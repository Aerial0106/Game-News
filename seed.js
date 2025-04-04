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
        title: 'Đấu Trường Chân Lý mùa 14: Thử nghiệm đội hình Twisted Fate Reroll "độc lạ"',
        content1: 'Tổng quan đội hình Twisted Fate Reroll của ĐTCL mùa 14. Một trong những tộc hệ khá thú vị ở ĐTCL mùa 14 chính là Băng Đảng với cơ chế kích hoạt một trang bị mang tên Kingpins Hat (Mũ Ông Trùm) để tăng sức mạnh cho tướng Băng Đảng sở hữu. Trong số này, Twisted Fate Reroll đang nổi lên như một lối chơi khá hiệu quả, khi chủ lực Twisted Fate có thể đảm bảo sức mạnh xuyên suốt ván đấu, còn những quân cờ còn lại có thể kết hợp các tộc hệ khác tạo nên một đội hình khá toàn diện.',
        content2: 'Đặc biệt, đội hình này không yêu cầu bất kỳ ấn nào cộng thêm để kích hoạt các mốc cần thiết cho tướng chủ lực. Đồng thời, người chơi cũng chỉ cần tập trung trang bị cho Darius (thủ) và Twisted Fate (công). Do đó, người chơi có thể thoải mái trong các vòng Chọn Chung mà không sợ trang bị của mình bị tranh giành quá nhiều.Hướng dẫn xây dựng đội hình Twisted Fate Reroll Là những vị tướng 1 - 2 vàng, người chơi có thể dễ dàng sở hữu bộ ba Darius - Twisted Fate - Shaco ngay từ những cấp độ đầu tiên. Chỉ cần thêm một tướng Đấu Sĩ là đủ để đội hình này có thể vượt qua các round đầu. Thậm chí, người chơi có thể roll liên tục, chấp nhận các ván thua đầu trận để có vị trí "đẹp" cho vòng Chọn Chung và có được các trang bị như ý.',
        content3: 'Từ cấp độ 6, người chơi có thể bổ sung Braum - vị tướng chống chịu khá chất lượng để bổ sung sức mạnh phòng thủ. Với việc TF là vị tướng mỏng, lối chơi xoay quanh quân cờ này cần nhiều dàn chắn nhất có thể. Người chơi có thể lựa chọn Skarner 2 vàng để kích hệ cùng với Braum, và Gragas để kích hệ Đấu Sĩ (nếu có). Ngoài ra, có thể bổ sung thêm KogMaw để kích hệ Liên Kích cho TF.',
        author: savedUsers[1]._id, // Lấy _id của user thứ 2
        category: 'Hướng dẫn',
        imageUrl: '/static/img/single-blog/tft.jpg',
        ImageUrl2: '/staticstatic/img/single-blog/tft(2).jpg',
        views: 0,
        comments: [{
          user: savedUsers[0]._id, // Lấy _id của user thứ 1
          text: 'Mùa mới này hơi khó chơi nha bro!',
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

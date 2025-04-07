const express = require('express');
const router = express.Router();
const Blog = require('../../models/blog');

// Hiển thị trang single blog
router.get('/:id', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).render('error', { message: 'ID không hợp lệ' });
        }

        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username')
            .populate('comments.user', 'username');
        
        if (!blog) {
            return res.status(404).render('error', { message: 'Bài viết không tồn tại' });
        }

        // Tăng lượt xem
        blog.views += 1;
        await blog.save();

        res.render('single-blog', { 
            blog: blog,
            user: req.user || null
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Lỗi server' });
    }
});

// Xử lý comment
router.post('/:id/comment', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Bạn cần đăng nhập để bình luận');
    }
    
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send('Bài viết không tồn tại');
        }

        blog.comments.push({
            user: req.user._id,
            text: req.body.comment
        });

        await blog.save();
        res.redirect(`/single-blog/${req.params.id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
});

module.exports = router;
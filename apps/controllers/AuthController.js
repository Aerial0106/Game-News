require('dotenv').config();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.showRegister = (req, res) => {
    res.render('auth/register');
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('auth/register', { error: 'Email đã được sử dụng' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log('User registered:', newUser);
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Error in register:', error);
        res.render('auth/register', { error: 'Đã có lỗi xảy ra, vui lòng thử lại' });
    }
};

exports.showLogin = (req, res) => {
    res.render('auth/login');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('auth/login', { error: 'Email hoặc mật khẩu không đúng' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('auth/login', { error: 'Email hoặc mật khẩu không đúng' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token created:', token);
        res.cookie('token', token, { httpOnly: true });
        console.log('Cookie set');
        res.redirect('/');
    } catch (error) {
        console.error('Error in login:', error);
        res.render('auth/login', { error: 'Đã có lỗi xảy ra, vui lòng thử lại' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};
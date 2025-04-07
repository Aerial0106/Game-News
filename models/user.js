// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    createdAt: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('User', userSchema);
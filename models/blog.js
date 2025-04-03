const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content1: { type: String, required: true },
  content2: { type: String},
  content3: { type: String},
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  imageUrl2: { type: String },

  views: { type: Number, default: 0 },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Blog', blogSchema);
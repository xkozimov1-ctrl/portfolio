const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  imageUrl: { type: String, required: true },
  liveDemoUrl: { type: String },
  githubUrl: { type: String },
  category: { type: String, enum: ['Web App', 'Telegram Bot', 'API/Backend', 'Other'], default: 'Web App' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

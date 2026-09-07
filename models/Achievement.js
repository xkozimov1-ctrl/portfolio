const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  icon: { type: String, default: '🏆' },
  metrics: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  avatarUrl: { type: String },
  telegramUrl: { type: String },
  githubUrl: { type: String },
  skills: [{ type: String }],
  stats: {
    projectsCount: { type: Number, default: 0 },
    experienceYears: { type: Number, default: 0 },
    satisfiedClients: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);

const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Achievement = require('../models/Achievement');

// GET /api/public/data - Barcha ommaviy ma'lumotlarni olish
router.get('/data', async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    const projects = await Project.find().sort({ createdAt: -1 });
    const achievements = await Achievement.find().sort({ createdAt: -1 });

    res.json({
      profile: profile || {
        fullName: "Dasturchi Ismi",
        title: "Node.js Full-Stack Developer",
        bio: "Node.js (v24.20.0), Express, MongoDB va zamonaviy web texnologiyalarida yuqori sifatli yechimlar yarataman.",
        avatarUrl: "https://via.placeholder.com/150",
        telegramUrl: "https://t.me",
        githubUrl: "https://github.com",
        skills: ["Node.js", "Express.js", "MongoDB Atlas", "Mongoose", "Tailwind CSS", "JavaScript"],
        stats: { projectsCount: 12, experienceYears: 2, satisfiedClients: 15 }
      },
      projects,
      achievements
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Achievement = require('../models/Achievement');

// All routes here are protected
router.use(auth);

// PROFILE CRUD / UPDATE
router.post('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
    } else {
      profile = new Profile(req.body);
      await profile.save();
    }
    res.json({ message: 'Profil muvaffaqiyatli saqlandi', profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PROJECTS CRUD
router.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Loyiha ochirildi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ACHIEVEMENTS CRUD
router.post('/achievements', async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/achievements/:id', async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Natija ochirildi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

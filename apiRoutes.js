const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/data', async (req, res) => {
  try {
    const { data: profile } = await supabase.from('profile').select('*').single();
    const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    const { data: achievements } = await supabase.from('achievements').select('*').order('created_at', { ascending: false });

    res.json({
      profile: profile || { full_name: "Dasturchi", title: "Full-Stack Developer" },
      projects: projects || [],
      achievements: achievements || []
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

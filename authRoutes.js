const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    // Birinchi marta kirishda admin foydalanuvchisini avtomatik yaratish (Setup)
    if (!user && (await User.countDocuments()) === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = new User({ username, password: hashedPassword });
      await user.save();
    } else if (!user) {
      return res.status(400).json({ message: 'Login yoki parol xato!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Login yoki parol xato!' });
    }

    const payload = { userId: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    res.json({ token, message: 'Muvaffaqiyatli kirildi' });
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi: ' + err.message });
  }
});

module.exports = router;

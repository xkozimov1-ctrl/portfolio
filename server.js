const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/public', require('./routes/apiRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// HTML View Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'views/admin.html')));

app.listen(PORT, () => {
  console.log(`🚀 Server Node.js v${process.versions.node} muhitida ishlamoqda.`);
  console.log(`🌐 Havola: http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const securityRoutes = require('./src/routes/security');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', securityRoutes);

app.listen(port, () => {
  console.log(`Cloud Armor API running on port ${port}`);
});
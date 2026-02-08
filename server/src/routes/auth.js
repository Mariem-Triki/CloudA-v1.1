const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'cloud-armor-super-secret-key';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Mock user for MVP
  if (email === 'admin@ancs.gov.tn' && password === 'password123') {
    const token = jwt.sign({ id: 1, email, role: 'Admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, user: { email, role: 'Admin' } });
  }
  
  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
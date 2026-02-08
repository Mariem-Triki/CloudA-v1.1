const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'cloud-armor-super-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (Mocked for preview, but ready for real PG)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// RBAC Middleware
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

// --- Auth Routes ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // In production: const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
  // Mock user for MVP
  if (email === 'admin@cloudarmor.io' && password === 'password123') {
    const token = jwt.sign({ id: 1, email, role: 'Admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, user: { email, role: 'Admin' } });
  }
  
  res.status(401).json({ message: 'Invalid credentials' });
});

// --- Security Routes ---
app.get('/api/accounts', authenticateToken, async (req, res) => {
  res.json([
    { id: 1, name: 'Production AWS', provider: 'AWS', status: 'Connected', riskScore: 24, assets: 450 },
    { id: 2, name: 'Azure Core Services', provider: 'Azure', status: 'Connected', riskScore: 68, assets: 120 }
  ]);
});

app.get('/api/findings', authenticateToken, async (req, res) => {
  res.json([
    { id: 'F-101', title: 'S3 Bucket Publicly Accessible', severity: 'Critical', category: 'CSPM', status: 'Open', asset: 'prod-backups', provider: 'AWS' }
  ]);
});

app.get('/api/containers/images', authenticateToken, async (req, res) => {
  res.json([
    { id: 'img-1', name: 'api-gateway', tag: 'v2.4.1', critical: 2, high: 14, medium: 32, status: 'Failing' }
  ]);
});

app.post('/api/scans/cspm', authenticateToken, authorizeRole(['Admin', 'Analyst']), (req, res) => {
  res.json({ message: 'Scan initiated', scanId: Date.now() });
});

app.listen(port, () => {
  console.log(`Cloud Armor API running on port ${port}`);
});
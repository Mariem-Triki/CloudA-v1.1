const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@db:5432/cloudarmor'
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Mock API for Cloud Accounts
app.get('/api/accounts', async (req, res) => {
  try {
    // In a real app, you'd query the DB: const result = await pool.query('SELECT * FROM cloud_accounts');
    res.json([
      { id: '1', name: 'Production AWS', provider: 'AWS', status: 'Connected', riskScore: 24 },
      { id: '2', name: 'Azure Core Services', provider: 'Azure', status: 'Connected', riskScore: 68 }
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mock API for Findings
app.get('/api/findings', async (req, res) => {
  res.json([
    { id: 'F-101', title: 'S3 Bucket Publicly Accessible', severity: 'Critical', category: 'CSPM' }
  ]);
});

app.listen(port, () => {
  console.log(`Cloud Armor API running on port ${port}`);
});
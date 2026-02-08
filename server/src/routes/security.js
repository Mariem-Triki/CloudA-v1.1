const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.get('/accounts', authenticateToken, async (req, res) => {
  res.json([
    { id: 1, name: 'Production AWS', provider: 'AWS', status: 'Connected', riskScore: 24, assets: 450 },
    { id: 2, name: 'Azure Core Services', provider: 'Azure', status: 'Connected', riskScore: 68, assets: 120 }
  ]);
});

router.get('/findings', authenticateToken, async (req, res) => {
  res.json([
    { id: 'F-101', title: 'S3 Bucket Publicly Accessible', severity: 'Critical', category: 'CSPM', status: 'Open', asset: 'prod-backups', provider: 'AWS' }
  ]);
});

router.get('/containers/images', authenticateToken, async (req, res) => {
  res.json([
    { id: 'img-1', name: 'api-gateway', tag: 'v2.4.1', critical: 2, high: 14, medium: 32, status: 'Failing' }
  ]);
});

router.post('/scans/cspm', authenticateToken, authorizeRole(['Admin', 'Analyst']), (req, res) => {
  res.json({ message: 'Scan initiated', scanId: Date.now() });
});

module.exports = router;
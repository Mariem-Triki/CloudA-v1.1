export const CLOUD_ACCOUNTS = [
  { id: '1', name: 'Production AWS', provider: 'AWS', status: 'Connected', riskScore: 24, assets: 450 },
  { id: '2', name: 'Azure Core Services', provider: 'Azure', status: 'Connected', riskScore: 68, assets: 120 },
  { id: '3', name: 'GCP Data Lab', provider: 'GCP', status: 'Warning', riskScore: 45, assets: 85 },
];

export const FINDINGS = [
  { id: 'F-101', title: 'S3 Bucket Publicly Accessible', severity: 'Critical', category: 'CSPM', status: 'Open', asset: 'prod-backups', provider: 'AWS' },
  { id: 'F-102', title: 'Hardcoded AWS Credentials in Terraform', severity: 'High', category: 'IaC', status: 'Open', asset: 'main.tf', provider: 'Git' },
  { id: 'F-103', title: 'Critical Vulnerability in Nginx Image', severity: 'Critical', category: 'Container', status: 'In Progress', asset: 'nginx:1.19', provider: 'DockerHub' },
  { id: 'F-104', title: 'Unrestricted SSH Access (0.0.0.0/0)', severity: 'High', category: 'CSPM', status: 'Open', asset: 'web-server-sg', provider: 'Azure' },
  { id: 'F-105', title: 'IAM User without MFA', severity: 'Medium', category: 'CSPM', status: 'Resolved', asset: 'admin-user', provider: 'AWS' },
];

export const COMPLIANCE_DATA = [
  { name: 'SOC2', score: 85 },
  { name: 'HIPAA', score: 72 },
  { name: 'PCI-DSS', score: 64 },
  { name: 'ISO 27001', score: 91 },
  { name: 'CIS Benchmark', score: 58 },
];

export const CONTAINER_IMAGES = [
  { id: 'img-1', name: 'api-gateway', tag: 'v2.4.1', critical: 2, high: 14, medium: 32, status: 'Failing' },
  { id: 'img-2', name: 'auth-service', tag: 'v1.0.8', critical: 0, high: 2, medium: 15, status: 'Passing' },
  { id: 'img-3', name: 'payment-worker', tag: 'latest', critical: 5, high: 22, medium: 45, status: 'Failing' },
];
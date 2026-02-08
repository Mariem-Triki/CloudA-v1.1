-- Cloud Armor Database Schema

-- Users & Auth
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'Analyst', -- Admin, Analyst, Viewer
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cloud Accounts
CREATE TABLE cloud_accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(50) NOT NULL, -- AWS, Azure, GCP
    external_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Connected',
    risk_score INTEGER DEFAULT 0,
    asset_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Findings
CREATE TABLE findings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(20) NOT NULL, -- Critical, High, Medium, Low
    category VARCHAR(50) NOT NULL, -- CSPM, IaC, Container, Vulnerability
    status VARCHAR(20) DEFAULT 'Open', -- Open, In Progress, Resolved, Suppressed
    asset_id VARCHAR(255),
    account_id INTEGER REFERENCES cloud_accounts(id),
    remediation_steps TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Container Images
CREATE TABLE container_images (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tag VARCHAR(100) NOT NULL,
    critical_vulns INTEGER DEFAULT 0,
    high_vulns INTEGER DEFAULT 0,
    medium_vulns INTEGER DEFAULT 0,
    scan_status VARCHAR(20) DEFAULT 'Pending',
    last_scanned_at TIMESTAMP WITH TIME ZONE
);
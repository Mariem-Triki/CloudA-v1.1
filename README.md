# Cloud Armor MVP

Enterprise-grade Cloud-Native Application Protection Platform (CNAPP).

## Features
- **Global Dashboard**: Real-time risk scoring and asset inventory.
- **CSPM Engine**: Continuous cloud configuration monitoring.
- **IaC Scanner**: Security analysis for Terraform and Kubernetes.
- **Container Security**: Vulnerability scanning for images.
- **RBAC Auth**: JWT-based authentication with role-based access.

## Local Setup

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- PostgreSQL (optional if running via Docker)

### Running with Docker (Recommended)
1. Clone the repository.
2. Run `docker-compose up --build`.
3. Access the frontend at `http://localhost:80`.
4. Access the API at `http://localhost:5000`.

### Manual Setup
1. **Backend**:
   - `cd server`
   - `npm install`
   - Create `.env` with `DATABASE_URL` and `JWT_SECRET`.
   - `npm start`
2. **Frontend**:
   - `npm install`
   - `npm run dev`

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, JWT, PostgreSQL.
- **Infrastructure**: Docker, Kubernetes-ready manifests.
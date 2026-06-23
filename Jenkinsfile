pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    environment {
        IMAGE_NAME = 'cloud-armor'
        IMAGE_TAG  = 'latest'
    }

    stages {

        // ── 1. CLONE ──────────────────────────────────
        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Mariem-Triki/CloudA-v1.1.git'
            }
        }

        // ── 2. INSTALL DEPENDENCIES ───────────────────
        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps'
                sh 'cd server && npm install'
            }
        }

        // ── 3. SONARQUBE ANALYSIS ─────────────────────
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        npx sonar-scanner \
                        -Dsonar.projectKey=cloud-armor \
                        -Dsonar.projectName="Cloud Armor MVP" \
                        -Dsonar.sources=src,server \
                        -Dsonar.host.url=http://192.168.236.12:9000 \
                        -Dsonar.exclusions=**/node_modules/**,**/dist/**
                    '''
                }
            }
        }

        // ── 4. DOCKER BUILD ───────────────────────────
        stage('Docker Build') {
            steps {
                sh 'docker compose build'
            }
        }

        // ── 5. TRIVY SCAN (NOUVEAU) ───────────────────
        stage('Trivy Scan') {
            steps {
                sh '''
                    trivy image \
                    --exit-code 0 \
                    --severity LOW,MEDIUM,HIGH,CRITICAL \
                    --format table \
                    --output trivy-report.txt \
                    ${IMAGE_NAME}:${IMAGE_TAG}
                '''
                sh 'cat trivy-report.txt'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'trivy-report.txt',
                                     allowEmptyArchive: true
                }
            }
        }

        // ── 6. DEPLOY ─────────────────────────────────
        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
                sh 'docker compose ps'
            }
        }
    }

    post {
        success {
            echo 'Pipeline terminé avec succès !'
        }
        failure {
            echo 'Pipeline échoué — vérifier les logs.'
        }
    }
}

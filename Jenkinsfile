pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                echo 'Clonage du projet...'
                git branch: 'main',
                    url: 'https://github.com/Mariem-Triki/CloudA-v1.1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installation des dependances frontend...'
                sh 'npm install'
                echo 'Installation des dependances backend...'
                sh 'cd server && npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Analyse qualite du code...'
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

        stage('Docker Build') {
            steps {
                echo 'Build de l image Docker...'
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploiement de l application...'
                sh 'docker compose up -d'
                sh 'docker compose ps'
            }
        }
    }

    post {
        success {
            echo 'Pipeline termine avec succes !'
        }
        failure {
            echo 'Pipeline echoue — verifier les logs.'
        }
    }
}

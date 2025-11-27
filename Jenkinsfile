pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dockerhub_username/my-web-app'  // Replace with your Docker Hub username
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins credential ID
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code from GitHub..."
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Pushing Docker image to Docker Hub..."
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to Local Docker Host') {
            steps {
                echo "Deploying Docker container locally..."
                sh '''
                docker rm -f my-web-app || true
                docker run -d --name my-web-app -p 8080:80 ${DOCKER_IMAGE}:latest
                docker ps -a
                '''
            }
        }

    }

    post {
        always {
            echo "Pipeline finished. Check above logs for output."
        }
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check logs to troubleshoot."
        }
    }
}

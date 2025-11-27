pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'hopespaccy/my_web_app'           // Your Docker Hub repo
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // Jenkins Docker Hub credentials
    }

    stages {

        // Step 1: Checkout your code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Step 2: Build Docker image from Dockerfile
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        // Step 3: Push Docker image to Docker Hub
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        // Step 4: Deploy Docker container locally
        stage('Deploy to Local Docker Host') {
            steps {
                script {
                    sh '''
                    docker rm -f my-web-app || true
                    docker run -d --name my-web-app -p 8080:80 hopespaccy/my_web_app:latest
                    '''
                }
            }
        }

    }

    post {
        success {
            echo "✅ Deployment successful! Visit http://localhost:8080"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}

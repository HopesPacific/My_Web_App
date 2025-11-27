pipeline {
    agent any

    // ← Environment variables go at the top, inside pipeline but outside stages
    environment {
        DOCKER_IMAGE = 'dockerhub_username/my-web-app'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {

        // Checkout your code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Build Docker image from Dockerfile
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        // ← Push to Docker Hub using credentials
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push('latest')
                    }
                }
            }
        }

    }
}

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'hopespaccy/my_web_app'             // Docker Hub repo name (all lowercase)
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins Credential ID
    }

    stages {

        // 1️⃣ Checkout code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // 2️⃣ Build Docker Image
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image once and store in a variable
                    env.DOCKER_TAG = "${DOCKER_IMAGE}:latest"
                    dockerImage = docker.build(env.DOCKER_TAG)
                }
            }
        }

        // 3️⃣ Push Docker Image to Docker Hub
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        // 4️⃣ Deploy Docker Container
        stage('Deploy') {
            steps {
                script {
                    echo "Deploying Docker container..."
                    bat "docker stop my_web_app || true"
                    bat "docker rm my_web_app || true"
                    bat "docker run -d -p 8080:80 --name my_web_app ${DOCKER_TAG}"
                }
            }
        }
    }
}

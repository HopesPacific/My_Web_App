pipeline {
    agent any

    environment {
        // Replace with your Docker Hub username (all lowercase)
        DOCKER_IMAGE = 'hopespaccy/my_web_app'
        // Replace with your Jenkins Docker Hub credentials ID
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {

        // 1️⃣ Checkout code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // 2️⃣ Build Docker image
        stage('Build Docker Image') {
            steps {
                script {
                    // Use 'def' to avoid Jenkins memory leak warning
                    def dockerImage = docker.build("${DOCKER_IMAGE}:latest")
                    // Save reference for push stage
                    env.DOCKER_IMAGE_ID = dockerImage.id
                }
            }
        }

        // 3️⃣ Push Docker image to Docker Hub
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        def dockerImage = docker.image("${DOCKER_IMAGE}:latest")
                        dockerImage.push('latest')
                    }
                }
            }
        }

        // 4️⃣ Deploy to local Docker host
        stage('Deploy to Local Docker Host') {
            steps {
                script {
                    sh '''
                    docker rm -f my-web-app || true
                    docker run -d --name my-web-app -p 8080:80 ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }

    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check above for errors."
        }
    }
}

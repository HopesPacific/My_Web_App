pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'hopespaccy/my_web_app'      // Replace with your Docker Hub repo
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins credential ID
    }

    stages {

        // 1️⃣ Checkout code from Git
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // 2️⃣ Build Docker image
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        // 3️⃣ Push Docker image to Docker Hub
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        // 4️⃣ Deploy to Local Docker Host
        stage('Deploy to Local Docker Host') {
            steps {
                sh '''
                # Remove old container if exists
                docker rm -f my_web_app || true

                # Run new container
                docker run -d --name my_web_app -p 8080:80 hopespaccy/my_web_app:latest
                '''
            }
        }

    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}

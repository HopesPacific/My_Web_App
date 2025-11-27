pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'hopespaccy/my_web_app'      // Replace with your Docker Hub repo
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins Docker Hub credentials
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        // ✅ Deploy locally (optional)
        stage('Deploy to Local Docker Host') {
            steps {
                sh '''
                docker rm -f my_web_app || true
                docker run -d --name my_web_app -p 8080:80 hopespaccy/my_web_app:latest
                '''
            }
        }

        // ✅ Deploy remotely via SSH
        stage('Deploy to Remote Docker Host') {
            steps {
                sshagent(['remote-host-ssh-key']) {  // Jenkins SSH credential ID
                    sh '''
                    ssh user@remote-host "docker pull hopespaccy/my_web_app:latest"
                    ssh user@remote-host "docker rm -f my-web-app || true"
                    ssh user@remote-host "docker run -d --name my-web-app -p 8080:80 hopespaccy/my_web_app:latest"
                    '''
                }
            }
        }

    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}

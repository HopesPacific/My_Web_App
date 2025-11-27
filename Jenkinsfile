pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                echo "Cloning repository..."
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Building the project..."

                // Linux/Mac commands:
                //sh 'ls -la'

                //For Windows Jenkins agents:
                bat 'dir'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                // Add test commands here, e.g:
                // sh 'npm test'
                // sh './mvnw test'
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying..."
                // Add your deployment script here, e.g:
                // sh './deploy.sh'
            }
        }
    }
}

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
                bat 'dir'     // Windows command
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                // Add your test commands here, for example:
                // bat 'npm test'
                // bat 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying..."
                // Add your deployment script here, for example:
                // bat 'deploy.bat'
            }
        }
    }
}

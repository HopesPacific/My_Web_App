pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                echo "📥 Cloning repository..."
                checkout scm

                // Show files after cloning
                echo "📂 Repository content:"
                bat 'dir'
            }
        }

        stage('Build') {
            steps {
                echo "🔧 Building the project..."

                // Show file details (Windows)
                bat 'dir /A /Q'
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running tests..."

                // Dummy visible test output
                bat 'echo Running sample tests...'
                bat 'echo Test 1 passed'
                bat 'echo Test 2 passed'
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Deploying..."

                // Simulate deployment output
                bat 'echo Deploying application...'
                bat 'echo Deployment completed successfully.'
            }
        }
    }
}

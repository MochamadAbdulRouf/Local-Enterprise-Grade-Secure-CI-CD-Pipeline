pipeline {
    agent any 

    environment {
        // ganti dengan username dockerhub 
        DOCKER_IMAGE = 'mochabdulrouf/note-taking-app'
        // ganti dengan IP Address VM 2 / Node-1 
        PROD_IP = '10.10.10.23'
        PROD_USER = 'rouf' 

        // ID Credentials yang dibuat di Jenkins
        DOCKER_CREDS_ID = 'docker-hub-login'
        SSH_CREDS_ID = 'vm2-ssh-key'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm 
            }
        }
        stage('Quality Check (SonarQube)') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('sonar-server') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=devops-project"
                    }
                }
            }
        }

        stage('Build Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDS_ID) {
                        def app = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }
        stage('Deploy to VM 2') {
            steps {
                sshagent([SSH_CREDS_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${PROD_USER}@${PROD_IP} '
                            docker pull ${DOCKER_IMAGE}:latest
                            docker stop my-app || true
                            docker rm my-app || true
                            docker run -d --name my-app -p 8082:3002 ${DOCKER_IMAGE}:10
                        '   
                    """
                }
            }
        }
    }
}
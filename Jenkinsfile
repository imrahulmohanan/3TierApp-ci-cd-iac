pipeline {
  agent any

  parameters {
    booleanParam(name: 'BUILD_UI', defaultValue: false)
    booleanParam(name: 'BUILD_API', defaultValue: false)
    booleanParam(name: 'BUILD_DB', defaultValue: false)
    booleanParam(name: 'DEPLOY_STACK', defaultValue: false)
    string(name: 'DOCKER_USER', defaultValue: 'docker-hub-creds', description: 'Docker Hub username')
  }

  environment {
    IMAGE_TAG = "v1"
  }

  stages {
    stage('Checkout Source') {
      steps {
        git url: 'https://github.com/imrahulmohanan/3TierApp-ci-cd-iac', branch: 'develop'
      }
    }

    stage('Build & Push UI') {
      when { expression { params.BUILD_UI } }
      steps {
        dir('contact-app-ui') {
          script {
            docker.withRegistry('', 'docker-hub-creds') {
              def image = docker.build("${params.DOCKER_USER}/contact-app-ui:${env.IMAGE_TAG}")
              image.push()
              image.push('latest')
            }
          }
        }
      }
    }

    stage('Build & Push API') {
      when { expression { params.BUILD_API } }
      steps {
        dir('contact-app-api') {
          script {
            docker.withRegistry('', 'docker-hub-creds') {
              def image = docker.build("${params.DOCKER_USER}/contact-app-api:${env.IMAGE_TAG}")
              image.push()
              image.push('latest')
            }
          }
        }
      }
    }

    stage('Build & Push DB') {
      when { expression { params.BUILD_DB } }
      steps {
        script {
          docker.withRegistry('', 'docker-hub-creds') {
            def image = docker.build("${params.DOCKER_USER}/contact-app-db:${env.IMAGE_TAG}", ".")
            image.push()
            image.push('latest')
          }
        }
      }
    }

    stage('Deploy Locally with Docker Compose') {
      when { expression { params.DEPLOY_STACK } }
      steps {
        sh '''
          echo "Stopping any existing stack..."
          docker-compose down || true

          echo "Pulling latest images..."
          docker-compose pull

          echo "Starting full stack..."
          docker-compose up -d
        '''
      }
    }
  }

  post {
    success {
      echo "Pipeline completed successfully."
    }
    failure {
      echo "One or more stages failed. Check the logs for details."
    }
  }
}

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
    IMAGE_TAG = "${BUILD_NUMBER}"
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
          withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh '''
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

              docker build -t $DOCKER_USER/contact-app:ui-${IMAGE_TAG} .
              docker push $DOCKER_USER/contact-app:ui-${IMAGE_TAG}

              docker tag $DOCKER_USER/contact-app:ui-${IMAGE_TAG} $DOCKER_USER/contact-app:ui-latest
              docker push $DOCKER_USER/contact-app:ui-latest
            '''
          }
        }
      }
    }

    stage('Build & Push API') {
      when { expression { params.BUILD_API } }
      steps {
        dir('contact-app-api') {
          withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh '''
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

              docker build -t $DOCKER_USER/contact-app:api-${IMAGE_TAG} .
              docker push $DOCKER_USER/contact-app:api-${IMAGE_TAG}

              docker tag $DOCKER_USER/contact-app:api-${IMAGE_TAG} $DOCKER_USER/contact-app:api-latest
              docker push $DOCKER_USER/contact-app:api-latest
            '''
          }
        }
      }
    }

    stage('Build & Push DB') {
      when { expression { params.BUILD_DB } }
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

            docker build -t $DOCKER_USER/contact-app:db-${IMAGE_TAG} .
            docker push $DOCKER_USER/contact:db-${IMAGE_TAG}

            docker tag $DOCKER_USER/contact-app:db-${IMAGE_TAG} $DOCKER_USER/contact-app:db-latest
            docker push $DOCKER_USER/contact-app:db-latest
          '''
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

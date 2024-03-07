pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="5878-8080-2577"
        AWS_DEFAULT_REGION="us-east-1"
        CLUSTER_NAME="jenkins-cluster"
        SERVICE_NAME="ecs-jenkins-pipeline-service"
        TASK_DEFINITION_NAME="first-run-task-definition"
        DESIRED_COUNT="1"
        IMAGE_REPO_NAME="jenkins_pipeline-ecr"
        IMAGE_TAG="dev"
        REPOSITORY_URI="587880802577.dkr.ecr.us-east-1.amazonaws.com"
        REPOSITORY_NAME="jenkins_pipeline-ecr"
        registryCredential='ecr:us-east-1:ecr-credentials'
    }

    stages {
        stage('Cloning Git Repository') {
            steps {
                checkout scm
            }
        }

        stage('build docker image') {
            steps {
                sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $REPOSITORY_URI'
                sh 'docker build -t jenkins_pipeline-ecr .'
                sh 'docker tag jenkins_pipeline-ecr:latest $REPOSITORY_URI/$REPOSITORY_NAME:$IMAGE_TAG'
                sh 'docker push $REPOSITORY_URI/$REPOSITORY_NAME:$IMAGE_TAG'
                sh 'docker rm -f $REPOSITORY_URI/$REPOSITORY_NAME:$IMAGE_TAG'
            }
        }

        stage('Deploy to Dev') {
            steps {
                echo "Starting Deployment to Dev Environment..."
            }
        }

        stage('Run Test') {
            steps {
                sh 'echo "Running unit tests..."'
                script {
                    if (isUnix()) {
                        sh './run_tests.sh'
                    } else {
                        bat './run_tests.bat'
                    }
                }
            }
        }

        stage('ECS Update') {
            steps {
                sh 'aws ecs update-service --cluster jenkins-cluster --service ecs-jenkins-pipeline-service --task-definition first-run-task-definition --force-new-deployment --region $AWS_DEFAULT_REGION'
            }
        }

        stage("Stage Deploy") {
            steps {
                echo "Stage deployment Successful"
            }
        }

        stage('Prod Deploy') {
            steps {
                sh 'aws ecs wait services-stable --cluster jenkins-cluster --service ecs-jenkins-pipeline-service --region $AWS_DEFAULT_REGION'
            }
        }
    }
}

// pipeline {
//     agent any
//     environment {
//         AWS_ACCOUNT_ID="5878-8080-2577"
//         AWS_DEFAULT_REGION="us-east-1" 
//         CLUSTER_NAME="jenkins-cluster"
//         SERVICE_NAME="ecs-jenkins-pipeline-service"
//         TASK_DEFINITION_NAME="first-run-task-definition"
//         DESIRED_COUNT="1"
//         IMAGE_REPO_NAME="ecr"
//         IMAGE_TAG="dev"
//         REPOSITORY_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
//         registryCredential="Demo-Jenkins-Pipeline"
//     }
   
//     stages {

//     // Tests
//     stage('Unit Tests') {
//       steps{
//         script {
//           sh 'npm install'
// 	  sh 'npm test -- --watchAll=false'
//         }
//       }
//     }
        
//     // Building Docker images
//     stage('Building image') {
//       steps{
    
//         script {
//           dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
//         }
//       }
//     }
   
//     // Uploading Docker images into AWS ECR
//     stage('Pushing to ECR') {
//      steps{  
//          script {
//            docker.withRegistry("https://" + REPOSITORY_URI, "ecr:${AWS_DEFAULT_REGION}:" + registryCredential) {
//        dockerImage.push()
//            }
//          }
//         }
//       }
      
//     stage('Deploy') {
//      steps{
//             withAWS(credentials: registryCredential, region: "${AWS_DEFAULT_REGION}") {
//                 script {
// 			sh './script.sh'
//                 }
//             } 
//         }
//       }      
      
//     }
// }
// pipeline {
//     agent any
//     environment {
//         AWS_ACCOUNT_ID="5878-8080-2577"
//         AWS_DEFAULT_REGION="us-east-1" 
//         CLUSTER_NAME="jenkins-cluster"
//         SERVICE_NAME="ecs-jenkins-pipeline-service"
//         TASK_DEFINITION_NAME="first-run-task-definition"
//         DESIRED_COUNT="1"
//         IMAGE_REPO_NAME="jenkins_pipeline-ecr"
//         IMAGE_TAG="dev"
//         REPOSITORY_URI="https://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
//         registryCredential='ecr:us-east-1:ecr-credentials'
//     }
//   stages {
//     stage('Cloning Git') {
//       steps {
//                 checkout scm

//       }
//     }
//     stage('Building image') {
//       steps{
//         script {
//           dockerImage = docker.build IMAGE_REPO_NAME
//         }
//       }
//     }
   
// stage('push Image') {

//       steps{
//         script {
//           docker.withRegistry("http://587880802577.dkr.ecr.us-east-1.amazonaws.com", 'ecr:us-east-1:ecr-credentials') {     
//             dockerImage.push("dev")
//              dockerImage.push('latest')

//           }
//         }
//       }
//     }
//     stage ('apply ecs updates') {
//              steps{
//                 sh 'aws ecs update-service --cluster jenkins-cluster --desired-count 1 --service ecs-jenkins-pipeline-service --task-definition first-run-task-definition --force-new-deployment'
//              }
//          }
 
//     stage('Remove Unused docker image') {
//           steps {
//               stage('Deploy on Elastic Container Service') {
//             steps {
//                withEnv (["AWS_ACCESS_KEY_ID-${env.AWS_ACCESS_ID}", "AWS_SECRET_ACCESS_KEY-${env.AWS_SECRET_ACCESS_KEY}", "AWS_DEFAULT_REGION-${env.AWS_DEFAULT_REGION}"]) {
//                 sh 'aws ecs update-service --cluster jenkins-cluster --desired-count 1 --service ecs-jenkins-pipeline-service --task-definition first-run-task-definition --force-new-deployment'
//             }
//         }
//     }
//     withCredentials([string(credentialsId: 'AWS_EXECUTION_ROL_SECRET', variable: 'AWS_ECS_EXECUTION_ROL'),string(credentialsId: 'AWS_REPOSITORY_URL_SECRET', variable: 'AWS_ECR_URL')]) {
//       script {
//         updateContainerDefinitionJsonWithImageVersion()
//         sh("aws ecs update-service --cluster jenkins-cluster --desired-count 1 --service ecs-jenkins-pipeline-service --task-definition first-run-task-definition --force-new-deployment")
//       }
//     }
//   }
//       steps{
// //        sh "docker rmi $IMAGE_REPO_NAME"
//         sh 'docker rm -f $IMAGE_REPO_NAME | echo "there is no docker container named $IMAGE_REPO_NAME"'
//         sh 'docker run --name $IMAGE_REPO_NAME -dp 80:3000 "$ECR_REGISTRY/$IMAGE_REPO_NAME:latest"'
//           }// End of remove unused docker image for master
//       }  
//     } //end of pipeline
// }

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
        stage('update ecs service') {
            steps {
                sh 'aws ecs update-service --cluster jenkins-cluster --service ecs-jenkins-pipeline-service --task-definition first-run-task-definition --force-new-deployment --region $AWS_DEFAULT_REGION'
            }
        }
        
<<<<<<< HEAD
        stage('waiting for ecs service to be stable') {
            steps {
                sh 'aws ecs wait services-stable --cluster jenkins-cluster --service ecs-jenkins-pipeline-service --region $AWS_DEFAULT_REGION'
            }
        }        
=======
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{
before_script:
    docker login --username foo --password-stdin < ~/my_password  
         script {
	   docker.withRegistry("https://" + REPOSITORY_URI, "ecr:${AWS_DEFAULT_REGION}:" + registryCredential) {
	dockerImage.push()
	  }
         }
        }
      }
      
    stage('Deploy') {
     steps{
            withAWS(credentials: registryCredential, region: "${AWS_DEFAULT_REGION}") {
                script {
			sh './script.sh'
                }
            } 
        }
      }      
      
>>>>>>> 2df55b7 (added new text line)
    }
}

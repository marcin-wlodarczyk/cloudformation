# cloudformation

This repository consists of reusable Cloud Formation Templates.

## Available templates

- [hello-world-alb-http.yaml](hello-world-alb-http.yaml)

The basic configuration of internet-facing Application Load Balancer. 
Supports only HTTP requests that are being forwarded to Target Group containing two EC2 instances (t2.micro).
EC2 instances are created based on the latest image available in the region. This template allows the selection of Virtual Private Cloud (VPC) and a list of subnets.


- [ecs-cluster.yaml](alb-ecs-nested/ecs-cluster.yaml)

This file contains a basic ECS Cluster configuration. Cluster support all kinds of CapacityProviders: `FARGATE` / `FARGATE_SPOT` and `EC2 INSTANCE`. EC2 instances are automatically created based on LaunchTemplate and the latest recommended ECS-optimized AMI. It is possible to select different InstanceTypes (t2.micro is a default value).

Important note:
If EC2 launch type is used, instances must have correct IamInstanceProfile associated. 
The default profile is automatically created for you when completing the Amazon ECS console first-run experience and has the following format: "arn:aws:iam::[AWS::AccountId]:instance-profile/ecsInstanceRole" 
if this profile doesn't exist it is possible to create it manually, for more details refer to [official documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html)

`alb-ecs-nested-farget-only` directory contains a necessary configuration to deploy a simple NodeJS API using ECS.

## TO-DO

- [ ] Uniform template resource names
- [ ] Create a new basic ALB template with HTTPS support

## Notes

### Elastic Container Service (ECS)

Launch Docker containers on AWS => Launch ECS Tasks on ECS Clusters

EC2 Launch type: 
- provision & maintain the infrastructure (EC2 instances)
- each EC2 instance must run ECS Agent to register in the ECS Cluster

Fargate Launch type:
- no need to provision infrastructure
- create task definition and AWS runs ECS Tasks (Serverless, based on CPU / RAM need)

Security:

EC2 Instance Profile (EC2 Launch Type only):
- Profile is used by running ECS agent to
  - make API calls to ECS service
  - send container logs to CloudWatch
  - pull docker image from ECR
  - reference secrets from Secrets Manager or SSM Parameter Store

ECS Task Role:
- Each task can have a specific role to access different services (S3, Dynamo DB etc.)

Service creation:
1. Create Task definition (how to create ECS task)
2. Create SG for ALB
3. Create SG for ECS Task

## Dummy Apps

### Build & Run

```bash
# Apple M1 is ARM-based systems, to run on AWS need to build for AMD64
docker build . --platform=linux/amd64 -t mwlodarczyk/node-api
docker run --rm -p 7501:80 -d mwlodarczyk/node-api
docker push mwlodarczyk/node-api
```
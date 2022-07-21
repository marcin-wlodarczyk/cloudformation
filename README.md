# cloudformation

This repository consists of reusable Cloud Formation Templates.

## Available templates

- [hello-world-alb-http.yaml](hello-world-alb-http.yaml)

The basic configuration of internet-facing Application Load Balancer. 
Supports only HTTP requests that are being forwarded to Target Group containing two EC2 instances (t2.micro).
EC2 instances are created based on the latest image available in the region. This template allows the selection of Virtual Private Cloud (VPC) and a list of subnets.
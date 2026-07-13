# Terraform Infrastructure as Code

## Overview

This directory contains the Infrastructure as Code (IaC) implementation for the **TechWave DevOps Platform**.

The purpose of this Terraform project is to provide a modular, reusable and scalable foundation for deploying the TechWave platform on Amazon Web Services (AWS), following Cloud Native and DevOps principles.

The infrastructure design supports future deployment of:

- Amazon EKS (Elastic Kubernetes Service)
- Amazon ECR (Elastic Container Registry)
- Amazon Route53
- AWS IAM
- AWS KMS
- AWS Secrets Manager
- Amazon Managed Prometheus
- Amazon Managed Grafana
- CloudWatch

Although the current implementation of the project has been validated using Kubernetes on Docker Desktop, this Terraform structure provides the foundation for a future enterprise-grade AWS deployment.

---

# Architecture

```text
Terraform
    │
    ▼
AWS Account
    │
 ┌──┬─────────────┬──────────┬───────────┐
 │  │             │          │           │
 ▼  ▼             ▼          ▼           ▼

VPC EKS          ECR      Route53    Security

 │
 ▼

TechWave Application

 │
 ▼

Monitoring
(Prometheus / Grafana / CloudWatch)
```

---

# Repository Structure

```text
terraform/
│
├── README.md
├── versions.tf
├── provider.tf
├── backend.tf
├── variables.tf
├── outputs.tf
├── main.tf
│
├── environments/
│   ├── dev/
│   │   └── terraform.tfvars
│   │
│   ├── pre/
│   │   └── terraform.tfvars
│   │
│   └── prod/
│       └── terraform.tfvars
│
└── modules/
    ├── networking/
    ├── ecr/
    ├── eks/
    ├── iam/
    ├── security/
    ├── monitoring/
    └── route53/
```

---

# Terraform Files

## versions.tf

Defines Terraform and provider version requirements.

Responsibilities:

- Terraform version control.
- AWS provider version control.
- Reproducible deployments.

---

## provider.tf

Configures the AWS provider.

Responsibilities:

- AWS authentication.
- Region selection.
- Default project tagging.

---

## backend.tf

Configures Terraform state storage.

Current implementation:

```text
Local Backend
```

Future evolution:

```text
AWS S3 Backend
+
DynamoDB State Locking
```

Benefits:

- Team collaboration.
- High availability.
- State protection.
- Auditability.

---

## variables.tf

Centralized definition of all reusable variables.

Examples:

- Environment.
- AWS region.
- CIDR blocks.
- Availability zones.
- Project metadata.

Benefits:

- Environment portability.
- Reusability.
- Standardization.

---

## outputs.tf

Exposes important infrastructure values.

Examples:

- VPC ID.
- EKS Endpoint.
- ECR URL.
- Route53 Zone ID.

Benefits:

- Module integration.
- CI/CD integration.
- Operational visibility.

---

## main.tf

Main Terraform composition file.

Responsible for orchestrating:

- Networking Module.
- ECR Module.
- EKS Module.
- IAM Module.
- Security Module.
- Monitoring Module.
- Route53 Module.

---

# Environments

Terraform supports multiple independent environments.

## Development

```text
environments/dev
```

Purpose:

- Development.
- Experiments.
- Functional validation.

---

## Preproduction

```text
environments/pre
```

Purpose:

- Integration testing.
- Acceptance testing.
- Release validation.

---

## Production

```text
environments/prod
```

Purpose:

- Production workloads.
- End-user traffic.
- Business services.

---

# Modules

The infrastructure follows a modular design.

Each module is independent and reusable.

---

# Networking Module

Location:

```text
modules/networking
```

Purpose:

Manage network infrastructure.

Resources:

- VPC
- Public Subnets
- Private Subnets
- Internet Gateway
- NAT Gateway
- Route Tables
- Security Groups

Outputs:

- VPC ID
- Public Subnet IDs
- Private Subnet IDs

Benefits:

- Network segmentation.
- High availability.
- Security isolation.

---

# ECR Module

Location:

```text
modules/ecr
```

Purpose:

Manage container repositories.

Resources:

- Amazon ECR Repository
- Image Scanning
- Immutable Tags
- Lifecycle Policies

Outputs:

- Repository Name
- Repository URL
- Repository ARN

Benefits:

- Centralized image storage.
- Image versioning.
- Secure distribution.

---

# EKS Module

Location:

```text
modules/eks
```

Purpose:

Provision Kubernetes infrastructure.

Resources:

- EKS Cluster
- Worker Nodes
- Security Groups
- Logging Configuration

Outputs:

- Cluster Name
- Cluster Endpoint
- Cluster Version

Benefits:

- Managed Kubernetes.
- High availability.
- Scalability.

---

# IAM Module

Location:

```text
modules/iam
```

Purpose:

Manage permissions and identities.

Resources:

- IAM Roles
- IAM Policies
- Service Accounts
- EKS Integrations

Outputs:

- Cluster Role ARN
- Node Group Role ARN

Benefits:

- Least privilege principle.
- Centralized access control.
- Improved governance.

---

# Security Module

Location:

```text
modules/security
```

Purpose:

Provide security services.

Resources:

- AWS KMS
- Secrets Manager
- Encryption Keys
- Secret Storage

Outputs:

- KMS Key ARN
- Secret Identifier

Benefits:

- Encryption at rest.
- Secret management.
- Security compliance.

---

# Monitoring Module

Location:

```text
modules/monitoring
```

Purpose:

Provide observability services.

Resources:

- CloudWatch
- Amazon Managed Prometheus
- Amazon Managed Grafana

Outputs:

- CloudWatch Log Group
- Prometheus Workspace
- Grafana Workspace

Benefits:

- Monitoring.
- Alerting.
- Operational dashboards.

---

# Route53 Module

Location:

```text
modules/route53
```

Purpose:

Manage DNS services.

Resources:

- Hosted Zones
- DNS Records
- Application Endpoints

Examples:

```text
app.techwave.com
grafana.techwave.com
prometheus.techwave.com
```

Outputs:

- Hosted Zone ID
- Domain Name

Benefits:

- Service discovery.
- DNS management.
- Future scalability.

---

# Deployment Workflow

```text
GitHub
    │
    ▼
GitHub Actions
    │
    ▼
Terraform Plan
    │
    ▼
Terraform Apply
    │
    ▼
AWS Infrastructure
    │
    ▼

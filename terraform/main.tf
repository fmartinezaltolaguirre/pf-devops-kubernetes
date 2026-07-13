#############################################################
# Main Terraform Composition
#
# Deploys:
# - Network
# - ECR
# - EKS
# - IAM
# - Security
# - Monitoring
# - Route53
#############################################################

module "networking" {

  source = "./modules/networking"

  environment           = var.environment

  vpc_cidr              = var.vpc_cidr

  public_subnet_a_cidr  = var.public_subnet_a_cidr
  public_subnet_b_cidr  = var.public_subnet_b_cidr

  private_subnet_a_cidr = var.private_subnet_a_cidr
  private_subnet_b_cidr = var.private_subnet_b_cidr

  availability_zone_a   = var.availability_zone_a
  availability_zone_b   = var.availability_zone_b

}

module "ecr" {

  source = "./modules/ecr"

}

module "eks" {

  source = "./modules/eks"

}

module "iam" {

  source = "./modules/iam"

}

module "security" {

  source = "./modules/security"

}

module "monitoring" {

  source = "./modules/monitoring"

}

module "route53" {

  source = "./modules/route53"

}

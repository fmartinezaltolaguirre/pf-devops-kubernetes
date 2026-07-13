#############################################################
# Root Outputs
#############################################################

output "vpc_id" {
  value = module.networking.vpc_id
}

output "ecr_repository_url" {
  value = module.ecr.repository_url
}

output "eks_cluster_name" {
  value = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "kms_key_arn" {
  value = module.security.kms_key_arn
}

output "hosted_zone_id" {
  value = module.route53.hosted_zone_id
}
``

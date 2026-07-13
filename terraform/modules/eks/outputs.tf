output "cluster_name" {
  value = aws_eks_cluster.techwave.name
}

output "cluster_endpoint" {
  value = aws_eks_cluster.techwave.endpoint
}

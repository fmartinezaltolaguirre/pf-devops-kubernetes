#############################################################
# EKS Cluster Placeholder
#
# Future deployment target
#############################################################

resource "aws_eks_cluster" "techwave" {

  name     = "eks-techwave"
  role_arn = "REPLACE_ROLE_ARN"

  vpc_config {

    subnet_ids = []

  }

}

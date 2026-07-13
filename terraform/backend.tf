#############################################################
# Terraform Backend
#
# Local backend for academic environment.
#
# Future evolution:
# AWS S3 backend
# DynamoDB locking
#############################################################

terraform {

  backend "local" {}

}

#############################################################
# Global Variables
#############################################################

variable "project_name" {
  type    = string
  default = "techwave"
}

variable "environment" {
  type = string
}

variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "vpc_cidr" {
  type = string
}

variable "public_subnet_a_cidr" {
  type = string
}

variable "public_subnet_b_cidr" {
  type = string
}

variable "private_subnet_a_cidr" {
  type = string
}

variable "private_subnet_b_cidr" {
  type = string
}

variable "availability_zone_a" {
  type = string
}

variable "availability_zone_b" {
  type = string
}

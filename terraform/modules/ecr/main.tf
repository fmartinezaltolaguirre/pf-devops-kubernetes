#############################################################
# ECR Repository
#############################################################

resource "aws_ecr_repository" "techwave" {

  name = "techwave-app"

  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {

    scan_on_push = true

  }

}

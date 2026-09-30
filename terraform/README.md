# Terraform Infrastructure as Code

## Resumen

La carpeta `terraform/` del repositorio contiene una base de Infraestructura como Código para desplegar la plataforma TechWave sobre AWS, con una estructura modular pensada para un entorno Kubernetes/EKS.

Es importante matizar que este repositorio tiene una estructura de Terraform bien organizada y orientada a la práctica, pero no es un despliegue completamente validado en producción ni una implementación final de un entorno cloud real. Actualmente funciona más como una base académica/tecnológica sobre la que seguir ampliando.

---

## Estado real del repo

### Lo que sí existe

- Estructura principal de Terraform con archivos raíz:
  - `main.tf`
  - `provider.tf`
  - `variables.tf`
  - `outputs.tf`
  - `versions.tf`
  - `backend.tf`
- Módulos con intención de separación funcional:
  - `modules/networking`
  - `modules/ecr`
  - `modules/eks`
  - `modules/iam`
  - `modules/security`
  - `modules/monitoring`
  - `modules/route53`
- Definición de variables comunes y provisionamiento de AWS provider.
- Integración de la composición principal con módulos por dominio.

### Lo que todavía no es completamente real

- No hay evidencia de un `terraform apply` validado contra AWS en este repo.
- El backend actual es `local`, no remoto (`S3 + DynamoDB`).
- Algunos módulos están definidos como estructura de base, pero no todos han sido completamente desplegados o comprobados en ejecución real.
- La documentación debe leerse como una base de infraestructura lista para evolucionar, no como una plataforma ya operativa en producción.

---

## Estructura actual

```text
terraform/
├── README.md
├── backend.tf
├── main.tf
├── provider.tf
├── variables.tf
├── outputs.tf
├── versions.tf
├── environments/
│   ├── dev/
│   ├── pre/
│   └── prod/
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

## Archivos raíz

### `versions.tf`

Define la versión mínima de Terraform y el proveedor AWS requerido.

```hcl
terraform {
  required_version = ">= 1.8"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
```

### `provider.tf`

Configura el provider AWS con región configurable y etiquetas por defecto.

```hcl
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
```

### `variables.tf`

Contiene variables globales para nombre del proyecto, entorno, región y rangos de red.

Ejemplos relevantes:

- `project_name`
- `environment`
- `aws_region`
- `vpc_cidr`
- `public_subnet_a_cidr`
- `public_subnet_b_cidr`
- `private_subnet_a_cidr`
- `private_subnet_b_cidr`

### `backend.tf`

Actualmente usa backend local:

```hcl
terraform {
  backend "local" {}
}
```

Esto es útil para entornos académicos o locales, pero para equipos reales y despliegues compartidos se recomienda migrarlo a:

- S3 para almacenamiento del estado
- DynamoDB para locking
- trazabilidad y colaboración

### `main.tf`

Es el punto de composición principal del despliegue. Aquí se invocan los módulos de networking, ECR, EKS, IAM, security, monitoring y route53.

```hcl
module "networking" {
  source = "./modules/networking"
  environment = var.environment
  vpc_cidr = var.vpc_cidr
  public_subnet_a_cidr = var.public_subnet_a_cidr
  public_subnet_b_cidr = var.public_subnet_b_cidr
  private_subnet_a_cidr = var.private_subnet_a_cidr
  private_subnet_b_cidr = var.private_subnet_b_cidr
  availability_zone_a = var.availability_zone_a
  availability_zone_b = var.availability_zone_b
}
```

### `outputs.tf`

Expone valores útiles para integrar la infraestructura con el resto del sistema, por ejemplo:

- `vpc_id`
- `ecr_repository_url`
- `eks_cluster_name`
- `eks_cluster_endpoint`
- `kms_key_arn`
- `hosted_zone_id`

---

## Módulos previstos

### `modules/networking`

Objetivo: provisionar la red base necesaria para la infraestructura del proyecto.

Incluye la intención de crear:

- VPC
- subredes públicas y privadas
- tablas de enrutamiento
- gateway
- seguridad de red

### `modules/ecr`

Objetivo: centralizar la gestión del registro de imágenes Docker.

Se orienta a recursos como:

- ECR repository
- políticas de ciclo de vida
- control de versiones de imágenes

### `modules/eks`

Objetivo: desplegar el cluster de Kubernetes gestionado por AWS.

Se enfoca en:

- EKS cluster
- node groups
- networking y seguridad de control plane

### `modules/iam`

Objetivo: gestionar identidades y permisos con el principio de mínimo privilegio.

### `modules/security`

Objetivo: manejar seguridad de infraestructura, incluidos:

- KMS
- Secrets Manager
- cifrado

### `modules/monitoring`

Objetivo: preparar la observabilidad de la infraestructura con Prometheus, Grafana y métricas de AWS.

### `modules/route53`

Objetivo: gestionar DNS y resolución de nombres para servicios de la plataforma.

---

## Cómo usarlo

### Inicializar

```bash
cd terraform
terraform init
```

### Validar sintaxis

```bash
terraform fmt
terraform validate
```

### Ver plan

```bash
terraform plan
```

### Aplicar

```bash
terraform apply
```

### Destruir

```bash
terraform destroy
```

---

## Recomendaciones para producción

Este repositorio está bien estructurado como base de proyecto, pero para producción real se recomienda:

- cambiar el backend local por S3 + DynamoDB
- separar entornos (`dev`, `pre`, `prod`) con tfvars específicos
- añadir `remote_state` / lock / auditability
- revisar y validar cada módulo individualmente
- introducir `terraform validate` y tests de calidad en CI
- usar `workspaces` o módulos por entorno para evitar acoplamiento
- añadir policies y controles de seguridad para IAM y networking

---

## Conclusión

La carpeta `terraform/` es una base sólida de IaC para la plataforma TechWave, con una estructura clara y alineada con una arquitectura cloud-native. Sin embargo, hay que entenderla como un proyecto en evolución: bien organizada, pero aún no completamente validada como infraestructura en producción real.

Es una excelente base académica y de aprendizaje, y un punto de partida serio para una implementación real en AWS/EKS.

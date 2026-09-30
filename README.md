# 🚀 TechWave DevOps Platform

> Plataforma DevOps Cloud Native basada en Docker, Kubernetes, GitHub Actions, Terraform y observabilidad con Prometheus.

![Docker](https://img.shields.io/badge/Docker-Containerized-blue?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestrated-326CE5?logo=kubernetes&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=github&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-IaC-623CE4?logo=terraform&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-Metrics-E6522C?logo=prometheus&logoColor=white)

## 📌 Descripción

TechWave DevOps Platform es un proyecto desarrollado como Proyecto Final del programa DevOps de Tokio School. Su objetivo es demostrar una arquitectura moderna basada en contenedores, orquestación con Kubernetes, despliegues automatizados y observabilidad básica con Prometheus.

La solución implementa los siguientes componentes:

- ✅ Aplicación Node.js + Express
- ✅ Contenerización con Docker
- ✅ Orquestación con Kubernetes
- ✅ Blue/Green deployment
- ✅ GitHub Actions para CI/CD
- ✅ Prometheus metrics en `/metrics`
- ✅ Infraestructura como código con Terraform
- ✅ Health checks y probes para Kubernetes
- ✅ Mejora de seguridad básica en contenedor y deployment

---

## 🎯 Objetivos del proyecto

| Objetivo | Descripción |
|----------|-------------|
| 📉 Reducir Time To Market | Automatizar la entrega de cambios |
| 🔄 Automatizar ciclo de vida | CI/CD básico y repetible |
| 📈 Aumentar disponibilidad | Despliegues con estrategia Blue/Green |
| 🚀 Facilitar escalado | Preparación para Kubernetes |
| 🔍 Mejorar trazabilidad | Métricas y health checks |
| ☁️ Preparar entorno cloud | Base IaC para AWS / EKS |

---

## 🏗️ Arquitectura actual

```text
Developer
   │
   ▼
GitHub Repository
   │
   ▼
GitHub Actions
   │
   ├─ Run tests
   ├─ Build Docker image
   ├─ Security scan (Trivy)
   ├─ Push to GHCR
   └─ Deploy to Kubernetes
            │
            ▼
      Kubernetes Cluster
            │
      ┌─────┼─────┐
      ▼     ▼     ▼
  BLUE   GREEN  Monitoring
  app    app    Prometheus
```

---

## 📂 Estructura del repositorio

```text
pf-devops-kubernetes/
├── app/
│   ├── src/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   └── app.test.js
│   ├── k8s/
│   │   ├── namespace.yaml
│   │   ├── configmap.yaml
│   │   ├── secret.yaml
│   │   ├── deployment-blue.yaml
│   │   ├── deployment-green.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── terraform/
│   ├── README.md
│   ├── backend.tf
│   ├── main.tf
│   ├── provider.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── versions.tf
│   ├── environments/
│   └── modules/
├── k8s/
│   └── servicemonitor.yaml
├── monitoring/
│   └── (estructura base / roadmap)
├── docs/
├── .github/
│   └── workflows/
│       └── ci.yml
├── README.md
└── LICENSE
```

---

## 🐳 Aplicación

La aplicación es un servicio Web Express que expone los siguientes endpoints:

### Endpoints principales

```http
GET /
GET /health
GET /version
GET /metrics
```

### Ejemplo de respuesta de salud

```json
{
  "status": "UP"
}
```

### Ejemplo de respuesta de versión

```json
{
  "version": "1.0.0"
}
```

### Endpoint de métricas Prometheus

`/metrics` expone métricas del proceso y métricas personalizadas del servicio, por ejemplo:

```text
# HELP techwave_http_requests_total Total number of HTTP requests
# TYPE techwave_http_requests_total counter
techwave_http_requests_total{method="GET",route="/health",status_code="200"} 1
```

Las métricas se generan con `prom-client` y son compatibles con Prometheus.

---

## 🐳 Docker

La imagen de la aplicación usa Node.js 22 Alpine y está preparada para ejecución no-root.

### Build local

```bash
cd app
docker build -t techwave-app:1.0.0 .
```

### Ejecutar localmente

```bash
docker run -p 3000:3000 techwave-app:1.0.0
```

### Verificar

```bash
curl http://localhost:3000/health
curl http://localhost:3000/metrics
```

### Mejoras de seguridad aplicadas

- Usuario no-root
- `HEALTHCHECK`
- `readOnlyRootFilesystem` en K8s
- `allowPrivilegeEscalation: false`
- `capabilities.drop: ["ALL"]`

---

## ☸️ Kubernetes

El proyecto incluye despliegues declarativos para Blue/Green en Kubernetes.

### Recursos implementados

- Namespace `techwave`
- Deployment `techwave-blue`
- Deployment `techwave-green`
- Service `techwave-service`
- ConfigMap y Secret base
- Ingress base
- ServiceMonitor para Prometheus

### Despliegue base

```bash
kubectl apply -f app/k8s/namespace.yaml
kubectl apply -f app/k8s/configmap.yaml
kubectl apply -f app/k8s/secret.yaml
kubectl apply -f app/k8s/deployment-blue.yaml
kubectl apply -f app/k8s/deployment-green.yaml
kubectl apply -f app/k8s/service.yaml
kubectl apply -f k8s/servicemonitor.yaml
```

### Probes y seguridad

Los deployments incluyen:

- `startupProbe`
- `readinessProbe`
- `livenessProbe`
- `resources.requests` y `resources.limits`
- `securityContext` mínimo para ejecución segura
- anotaciones de Prometheus para scraping

---

## 📈 Observabilidad

La infraestructura incluye una capa base de observabilidad con Prometheus,
que scrapea la aplicación en `/metrics`.

### Componentes implementados

- ✅ Prometheus metrics endpoint (`/metrics`)
- ✅ Servicemonitor para Prometheus
- ✅ Health checks para Kubernetes
- ✅ Métricas HTTP customizadas

### Componentes previstos en roadmap

- 🔄 Grafana dashboards
- 🔄 Loki para agregación de logs
- 🔄 OpenTelemetry tracing
- 🔄 Alertmanager

---

## 🔄 CI/CD

El repositorio incorpora un workflow de GitHub Actions para validar, construir, escanear y desplegar la aplicación.

### Pipeline actual

- Run unit tests
- Build Docker image
- Scan image with Trivy
- Push image to GHCR
- Deploy to Kubernetes
- Smoke tests over `/health`, `/version`, `/metrics`
- Automatic rollback if deployment fails

### Workflow

```yaml
name: TechWave CI/CD
```

Archivo principal:

- `.github/workflows/ci.yml`

---

## 🏗️ Terraform

La carpeta `terraform/` contiene la base para infraestructura como código sobre AWS/EKS, con una estructura modular pensada para:

- networking
- EKS
- IAM
- security
- monitoring
- route53
- ECR

Actualmente el repositorio tiene una base funcional de estructura y diseño, y se encuentra en evolución hacia un entorno de despliegue más maduro y reproducible.

### Comandos básicos

```bash
cd terraform
terraform fmt
terraform validate
terraform plan
terraform apply
```

---

## ✅ Estado real del proyecto

| Componente | Estado |
|------------|--------|
| Aplicación Node.js | ✅ Implementada |
| Docker | ✅ Implementado |
| Kubernetes manifests | ✅ Implementados |
| Blue/Green deployment | ✅ Implementado |
| `/health` | ✅ Implementado |
| `/version` | ✅ Implementado |
| `/metrics` | ✅ Implementado |
| Prometheus scraping | ✅ Implementado |
| CI/CD workflow | ✅ Base implementada |
| Terraform | 🚧 En evolución |
| Grafana / Loki / OTel | 🚧 Roadmap |
| Producción enterprise-ready | 🚧 Requiere más hardening |

---

## 🗺️ Roadmap

### Fase 1 - Completada

- [x] App Node.js + Express
- [x] Docker
- [x] Kubernetes manifests base
- [x] Blue/Green deployment
- [x] Prometheus metrics
- [x] GitHub Actions base

### Fase 2 - En progreso

- [ ] Fortalecer seguridad del contenedor y del deployment
- [ ] Mejorar la integración entre pipeline y cluster
- [ ] Terraform más completo y listo para entorno real
- [ ] Dashboards Grafana
- [ ] Alertmanager

### Fase 3 - Planeado

- [ ] Loki aggregation
- [ ] OpenTelemetry tracing
- [ ] ArgoCD / GitOps
- [ ] Service Mesh (Istio)
- [ ] Multi-region deployment

---

## 🆘 Troubleshooting

### Verificar health

```bash
curl http://localhost:3000/health
```

### Verificar métricas

```bash
curl http://localhost:3000/metrics
```

### Ver logs del pod

```bash
kubectl logs -f deployment/techwave-blue -n techwave
```

### Ver rollout / rollback

```bash
kubectl rollout status deployment/techwave-blue -n techwave
kubectl rollout undo deployment/techwave-blue -n techwave
```

---

## 📚 Recursos adicionales

- [Kubernetes Docs](https://kubernetes.io/docs/)
- [Docker Docs](https://docs.docker.com/)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Prometheus Docs](https://prometheus.io/docs/)
- [Terraform Docs](https://developer.hashicorp.com/terraform/docs)

---

## 👤 Autor

Fernando Martínez Altolaguirre

Repositorio: https://github.com/fmartinezaltolaguirre/pf-devops-kubernetes

---

## 📄 Licencia

Proyecto académico y formativo dentro del programa DevOps de Tokio School.

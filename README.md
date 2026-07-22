# 🚀 TechWave DevOps Platform

> Diseño e implementación de una plataforma DevOps Cloud Native basada en Kubernetes, Docker, GitHub Actions y Observabilidad Moderna.

![Docker](https://img.shields.io/badge/Docker-Containerized-blue?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestrated-326CE5?logo=kubernetes&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=github&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-IaC-623CE4?logo=terraform&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

---

## 📖 Descripción

**TechWave DevOps Platform** es un proyecto desarrollado como **Proyecto Final del Programa DevOps de Tokio School**, cuyo objetivo es diseñar e implementar una plataforma moderna basada en principios **Cloud Native**, automatización **CI/CD**, contenerización, observabilidad y despliegues seguros mediante Kubernetes.

La solución implementa una arquitectura DevOps completa que integra:

- ✅ Aplicación Node.js + Express
- ✅ Docker para contenerización
- ✅ Kubernetes para orquestación
- ✅ GitHub Actions para CI/CD
- ✅ GitHub Container Registry (GHCR)
- ✅ Blue-Green Deployment
- ✅ Terraform como Infraestructura como Código
- ✅ Prometheus Metrics
- ✅ Observabilidad (Grafana, Loki, OpenTelemetry)

---

## 🎯 Objetivos

La plataforma persigue los siguientes objetivos:

| Objetivo | Descripción |
|----------|-------------|
| 📉 **Reducir Time To Market** | Automatizar despliegues |
| 🔄 **Automatizar Ciclo de Vida** | CI/CD completo |
| 📈 **Incrementar Disponibilidad** | Zero-downtime deployments |
| 🚀 **Facilitar Escalado** | Horizontal Pod Autoscaler ready |
| 🔍 **Trazabilidad Completa** | Observabilidad end-to-end |
| 📊 **Observabilidad desde Diseño** | Métricas, logs, traces |
| ☁️ **Preparar para Cloud** | Multi-cloud ready |

---

## 🏗️ Arquitectura

```
                     ┌─────────────────┐
                     │   Developer     │
                     └────────┬────────┘
                              │ Git Push
                              ▼
                     ┌─────────────────┐
                     │  GitHub Repo    │
                     └────────┬────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │  GitHub Actions      │
                   │      CI/CD Pipeline  │
                   │  • Validate Code     │
                   │  • Run Tests         │
                   │  • Build Image       │
                   │  • Security Scan     │
                   └────────┬─────────────┘
                            │
                            ▼
                   ┌──────────────────────┐
                   │  GitHub Container   │
                   │   Registry (GHCR)   │
                   │  Docker Image Store │
                   └────────┬─────────────┘
                            │
                            ▼
                  ┌────────────────────────┐
                  │  Kubernetes Cluster    │
                  │    (EKS / Minikube)    │
                  └────────┬───────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
     ┌─────────┐    ┌─────────┐    ┌──────────────┐
     │  BLUE   │    │  GREEN  │    │  Monitoring  │
     │Deployment    │Deployment    │ • Prometheus │
     │ (Active)     │ (Standby)     │ • Grafana    │
     │ v1.0.0  │    │ v1.1.0  │    │ • Loki       │
     └────┬────┘    └────┬────┘    └──────────────┘
          │              │
          └──────┬───────┘
                 ▼
        ┌──────────────────┐
        │  Service (LB)    │
        │ Load Balancer    │
        └──────┬───────────┘
               │
               ▼
        ┌──────────────────┐
        │   Application    │
        │   Port 3000      │
        └──────────────────┘
```

---

## 🛠️ Tecnologías Utilizadas

### Desarrollo

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Node.js | 22.x | Runtime JavaScript |
| Express | 5.2.x | Framework HTTP |
| Jest | 30.x | Testing |
| Supertest | 7.2.x | HTTP Testing |

### Contenerización

| Tecnología | Propósito |
|-----------|----------|
| Docker | Contenerización de aplicación |
| Docker Compose | Orquestación local |
| GHCR | Registry centralizado |

### Orquestación

| Tecnología | Propósito |
|-----------|----------|
| Kubernetes | Orquestación de contenedores |
| Minikube | Testing local |
| EKS | Kubernetes en AWS |

### CI/CD

| Tecnología | Propósito |
|-----------|----------|
| GitHub Actions | Automatización pipeline |
| GitHub Workflows | Definición de jobs |
| Trivy | Escaneo de vulnerabilidades |

### Infraestructura como Código

| Tecnología | Propósito |
|-----------|----------|
| Terraform | IaC (AWS) |
| HCL | Lenguaje de configuración |

### Observabilidad

| Tecnología | Propósito | Estado |
|-----------|----------|--------|
| Prometheus | Time-series database | ✅ Configurado |
| Grafana | Dashboards | 📋 Diseñado |
| Loki | Log aggregation | 📋 Diseñado |
| OpenTelemetry | Distributed tracing | 📋 Diseñado |
| Node Exporter | Métricas de nodo | 📋 Diseñado |
| cAdvisor | Métricas de contenedores | 📋 Diseñado |

---

## 📂 Estructura del Proyecto

```
pf-devops-kubernetes/
│
├── app/                              # Aplicación Node.js
│   ├── src/
│   │   ├── app.js                   # Rutas y lógica
│   │   └── server.js                # Punto de entrada
│   ├── tests/
│   │   └── app.test.js              # Tests unitarios
│   ├── k8s/
│   │   ├── namespace.yaml           # Namespace "techwave"
│   │   ├── configmap.yaml           # Configuración
│   │   ├── secret.yaml              # Secretos
│   │   ├── deployment-blue.yaml     # Deployment Blue
│   │   ├── deployment-green.yaml    # Deployment Green
│   │   ├── service.yaml             # Service (LB)
│   │   └── ingress.yaml             # Ingress controller
│   ├── Dockerfile                   # Imagen Docker
│   ├── .dockerignore
│   ├── package.json
│   └── package-lock.json
│
├── terraform/                        # Infraestructura (AWS)
│   ├── main.tf                      # Composición principal
│   ├── provider.tf                  # Configuración AWS
│   ├── variables.tf                 # Variables
│   ├── outputs.tf                   # Salidas
│   ├── versions.tf                  # Versiones
│   ├── backend.tf                   # Backend de estado
│   ├── environments/                # Configuraciones por entorno
│   └── modules/
│       ├── networking/              # VPC, Subnets
│       ├── ecr/                     # Container Registry
│       ├── eks/                     # Kubernetes
│       ├── iam/                     # Identidad y acceso
│       ├── security/                # Security Groups
│       ├── monitoring/              # Stack de monitoreo
│       └── route53/                 # DNS
│
├── k8s/                             # Manifiestos K8s
│   └── servicemonitor.yaml          # Prometheus ServiceMonitor
│
├── monitoring/                      # Stack de Observabilidad
│   ├── prometheus/                  # Configuración Prometheus
│   ├── grafana/                     # Dashboards Grafana
│   ├── loki/                        # Log aggregation
│   ├── promtail/                    # Log shipper
│   ├── node-exporter/               # Métricas de nodos
│   ├── cadvisor/                    # Métricas de contenedores
│   ├── alertmanager/                # Gestión de alertas
│   ├── opentelemetry/               # Distributed tracing
│   ├── kustomization.yaml
│   └── README
│
├── .github/
│   └── workflows/
│       └── ci.yml                   # Pipeline CI/CD
│
├── docs/                            # Documentación adicional
│
└── README.md                        # Este archivo
```

---

## 🐳 Contenerización

La aplicación se ejecuta mediante una imagen Docker optimizada y versionada.

### Build

```bash
cd app
docker build -t techwave-app:1.0.0 .
```

### Run Local

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  techwave-app:1.0.0
```

### Verificación

```bash
docker ps
curl http://localhost:3000
```

### Dockerfile Optimizado

```dockerfile
FROM node:22-alpine          # Imagen base ligera
WORKDIR /app                 # Directorio de trabajo
COPY package*.json ./        # Dependencias
RUN npm ci --omit=dev       # Instalación producción
COPY src ./src              # Código fuente
RUN addgroup -S nodeapp && \
    adduser -S nodeuser     # Usuario no-root
USER nodeuser               # Cambiar usuario
EXPOSE 3000                 # Puerto
CMD ["npm","start"]         # Comando
```

---

## ☸️ Kubernetes

La plataforma se despliega sobre Kubernetes utilizando recursos declarativos.

### Recursos Principales

```yaml
Namespaces:   techwave
Deployments:  techwave-blue, techwave-green
Services:     techwave-service
ConfigMaps:   techwave-config
Secrets:      techwave-secrets
```

### Despliegue Rápido

```bash
# 1. Crear Namespace
kubectl apply -f app/k8s/namespace.yaml

# 2. Configurar ConfigMap y Secrets
kubectl apply -f app/k8s/configmap.yaml
kubectl apply -f app/k8s/secret.yaml

# 3. Desplegar Blue & Green
kubectl apply -f app/k8s/deployment-blue.yaml
kubectl apply -f app/k8s/deployment-green.yaml

# 4. Crear Service
kubectl apply -f app/k8s/service.yaml

# 5. (Opcional) Ingress
kubectl apply -f app/k8s/ingress.yaml
```

### Verificación

```bash
# Ver recursos
kubectl get all -n techwave

# Ver pods
kubectl get pods -n techwave -o wide

# Ver deployments
kubectl get deployments -n techwave

# Ver servicios
kubectl get svc -n techwave
```

### Logs

```bash
# Logs de un pod
kubectl logs -f deployment/techwave-blue -n techwave

# Logs en tiempo real (tail)
kubectl logs -f POD_NAME -n techwave --tail=100
```

### Port-Forward (Acceso temporal)

```bash
kubectl port-forward service/techwave-service 8081:80 -n techwave
```

Acceder a: `http://localhost:8081`

---

## 🔄 CI/CD

La automatización se implementa mediante **GitHub Actions**.

### Flujo del Pipeline

```
┌──────────────┐
│  Git Push    │
│  to main     │
└──────┬───────┘
       ▼
┌──────────────────────┐
│  Checkout Repository │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│   Setup Node.js 22   │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ Install Dependencies │
│   npm ci             │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│    Run Tests         │
│    npm test          │
└──────┬───────────────┘
       │ ✅ Pasa
       ▼
┌──────────────────────┐
│   Build Docker Image │
│   GHCR tagging       │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│  Security Scanning   │
│  Trivy scan          │
└──────┬───────────────┘
       │ ✅ OK
       ▼
┌──────────────────────┐
│   Push to GHCR       │
│   Container Registry │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ Deploy to Kubernetes │
│   (Blue-Green)       │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│  Validation Tests    │
│  E2E checks          │
└──────┬───────────────┘
       │ ❌ Falla
       └──────────────────┐
                          ▼
                  ┌───────────────────┐
                  │ Automatic Rollback│
                  │ (volver a BLUE)   │
                  └───────────────────┘
```

### Trigger Conditions

```yaml
on:
  push:
    branches: [main]      # Despliegue producción
  pull_request:
    branches: [main]      # Validación PR
```

### Capacidades

- ✅ Build automático
- ✅ Validación continua
- ✅ Tests automatizados
- ✅ Escaneo de vulnerabilidades (Trivy)
- ✅ Publicación en GHCR
- ✅ Despliegue automatizado
- ✅ Trazabilidad completa

---

## 🔵🟢 Blue-Green Deployment

El proyecto implementa una estrategia **Blue-Green Deployment** para minimizar el riesgo asociado a nuevas versiones.

### Funcionamiento

```
Estado Inicial:
┌──────────────────────┐
│  Service Router      │  Traffic 100%
│  (selector: blue)    │
└──────────┬───────────┘
           │
           ▼
    ┌─────────────┐
    │    BLUE     │  ◄── Producción (ACTIVO)
    │  v1.0.0     │      Recibe tráfico
    └─────────────┘

    GREEN: Standby (sin tráfico)

┌─────────────────────────────────────────────┐
│  1. Desplegar versión nueva en GREEN        │
│  2. Ejecutar smoke tests                    │
│  3. Validar compatibilidad                  │
│  4. Si OK → cambiar selector en Service     │
│  5. Si ERROR → mantener BLUE activo         │
└─────────────────────────────────────────────┘

Estado Post-Cambio:
┌──────────────────────┐
│  Service Router      │  Traffic 100%
│  (selector: green)   │
└──────────┬───────────┘
           │
           ▼
    ┌─────────────┐
    │    GREEN    │  ◄── Producción (ACTIVO)
    │  v1.1.0     │      Recibe tráfico
    └─────────────┘

    BLUE: Fallback (disponible para rollback)
```

### Ventajas

| Ventaja | Descripción |
|---------|-------------|
| 🟢 **Sin Downtime** | Cero interrupciones de servicio |
| 🔄 **Testing Pre-Prod** | Validar antes de cambiar tráfico |
| ⚡ **Rollback Instantáneo** | Revertir al instante si hay problemas |
| 📉 **Menor Riesgo** | Dos entornos paralelos |
| 📊 **Compatibilidad Datos** | Gestión ordenada de migraciones |

### Cambio de Tráfico

```bash
# 1. Desplegar en GREEN
kubectl apply -f app/k8s/deployment-green.yaml

# 2. Esperar a que esté Ready
kubectl wait --for=condition=Ready pod \
  -l app=techwave,version=green -n techwave --timeout=300s

# 3. Ejecutar smoke tests
curl http://localhost:8081/health

# 4. Cambiar selector (ahora GREEN recibe tráfico)
kubectl patch service techwave-service -n techwave \
  -p '{"spec":{"selector":{"version":"green"}}}'

# 5. Si hay problemas, rollback inmediato:
kubectl patch service techwave-service -n techwave \
  -p '{"spec":{"selector":{"version":"blue"}}}'
```

---

## 🌐 Endpoints Disponibles

### Root Endpoint

```http
GET /
```

**Respuesta:** Dashboard HTML interactivo

### Health Check

```http
GET /health
```

**Respuesta:**
```json
{
  "status": "UP"
}
```

*Utilizado por Kubernetes Readiness & Liveness Probes*

### Version

```http
GET /version
```

**Respuesta:**
```json
{
  "version": "1.0.0"
}
```

### Métricas Prometheus

```http
GET /metrics
```

**Métricas expuestas:**
- `process_cpu_user_seconds_total` - CPU del proceso
- `process_resident_memory_bytes` - Memoria residente
- `nodejs_eventloop_lag_seconds` - Event loop lag
- `nodejs_heap_size_used_bytes` - Heap utilizado
- `nodejs_gc_duration_seconds` - Garbage collector
- `http_requests_total` - Total de requests
- `http_request_duration_seconds` - Latencia

---

## ❤️ Readiness y Liveness Probes

Kubernetes supervisa continuamente la salud de la aplicación.

### Configuración

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Beneficios

✅ Recuperación automática de fallos  
✅ Despliegues seguros  
✅ Alta disponibilidad  
✅ Menor intervención manual  

---

## 📊 Observabilidad

La aplicación incorpora instrumentación compatible con **Prometheus**.

### Stack Incluido

```
Application Metrics
      │
      ▼
┌─────────────┐     ┌──────────────┐
│ Prometheus  │────▶│   Grafana    │
│  (TSDB)     │     │ (Dashboards) │
└─────────────┘     └──────────────┘

Application Logs
      │
      ▼
┌──────────────┐    ┌──────────────┐
│  Promtail    │───▶│    Loki      │
│ (Log Client) │    │ (Log Store)  │
└──────────────┘    └──────────────┘

Distributed Tracing
      │
      ▼
┌──────────────────────┐
│  OpenTelemetry       │
│  (Traces & Spans)    │
└──────────────────────┘
```

### ServiceMonitor

```bash
kubectl apply -f k8s/servicemonitor.yaml
```

Permite que Prometheus descubra automáticamente los endpoints de métricas.

---

## 🔒 Seguridad

La plataforma aplica principios **DevSecOps**.

### Controles Implementados

| Control | Descripción |
|---------|------------|
| 🔐 **Usuario No-Root** | Imagen ejecuta con usuario `nodeuser` |
| 🔑 **Gestión de Secretos** | Kubernetes Secrets + ConfigMaps |
| 🛡️ **Escaneo Trivy** | Análisis de vulnerabilidades en pipeline |
| 👤 **RBAC** | Role-Based Access Control |
| 🔒 **Principio Mínimos Privilegios** | Permisos restringidos |
| 📝 **Audit Logging** | Trazabilidad de eventos |

### Recomendaciones Producción

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
```

---

## 📦 Infraestructura como Código (Terraform)

Terraform permite gestionar la infraestructura de forma **declarativa**.

### Módulos Incluidos

```
terraform/modules/
├── networking/        # VPC, Subnets, NAT Gateway
├── ecr/              # Elastic Container Registry
├── eks/              # Elastic Kubernetes Service
├── iam/              # Identity & Access Management
├── security/         # Security Groups
├── monitoring/       # Prometheus, Grafana stack
└── route53/          # DNS Management
```

### Comandos

```bash
cd terraform

# Validar sintaxis
terraform fmt
terraform validate

# Plan de cambios
terraform plan

# Aplicar cambios
terraform apply

# Destruir infraestructura
terraform destroy
```

### Beneficios

✅ Reproducibilidad  
✅ Trazabilidad de cambios  
✅ Automatización total  
✅ Escalabilidad  
✅ Versionado de infraestructura  

---

## 🚀 Guía de Inicio Rápido

### Opción 1: Local (Docker)

```bash
# Clonar
git clone https://github.com/fmartinezaltolaguirre/pf-devops-kubernetes.git
cd pf-devops-kubernetes

# Build
cd app
docker build -t techwave-app .

# Run
docker run -p 3000:3000 techwave-app

# Test
curl http://localhost:3000
```

### Opción 2: Kubernetes Local (Minikube)

```bash
# Instalar Minikube
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Iniciar
minikube start --cpus=4 --memory=4096

# Desplegar
kubectl apply -f app/k8s/

# Acceder
minikube service techwave-service -n techwave
```

### Opción 3: AWS EKS (con Terraform)

```bash
# Instalar Terraform
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform

# Configurar AWS
aws configure

# Desplegar
cd terraform
terraform init
terraform apply

# Configurar kubectl
aws eks update-kubeconfig --name techwave --region us-east-1

# Desplegar app
kubectl apply -f ../app/k8s/
```

---

## ✅ Testing

### Ejecutar Tests Locales

```bash
cd app
npm ci
npm test
```

### Tests Incluidos

- ✅ `GET /` - Endpoint root
- ✅ `GET /health` - Health check
- ✅ `GET /version` - Version endpoint
- ✅ Status code validations
- ✅ Response format checks

### Tests en Kubernetes

```bash
# Pod de debug
kubectl run -it --rm debug --image=curlimages/curl --restart=Never \
  -n techwave -- sh

# Dentro del pod:
curl http://techwave-service/health
curl http://techwave-service/version
curl http://techwave-service/metrics
```

---

## 📈 Indicadores Objetivo (KPIs)

| KPI | Objetivo | Estado |
|-----|----------|--------|
| 📊 **Disponibilidad** | > 99,5 % | 🎯 En progreso |
| ⏱️ **MTTR** | < 15 min | 🎯 En progreso |
| 🚀 **Tiempo Despliegue** | < 10 min | 🎯 En progreso |
| 🔄 **Automatización CI/CD** | > 95 % | ✅ Logrado |
| 📡 **Cobertura Observabilidad** | 100 % | 🎯 En progreso |
| 🛡️ **Vulnerabilidades Críticas** | 0 | ✅ Logrado |

---

## 🗺️ Roadmap

### ✅ Fase 1 (Completada)

- [x] Kubernetes fundamentals
- [x] Docker & Dockerfile
- [x] GitHub Actions
- [x] Blue-Green Deployment
- [x] Prometheus metrics

### 🚧 Fase 2 (En Progreso)

- [ ] Grafana dashboards
- [ ] Loki log aggregation
- [ ] AlertManager

### 📋 Fase 3 (Planeada)

- [ ] OpenTelemetry
- [ ] ArgoCD / GitOps
- [ ] Service Mesh (Istio)

### 🔮 Fase 4 (Futuro)

- [ ] Multi-region deployment
- [ ] AKS (Azure Kubernetes)
- [ ] FinOps optimization
- [ ] SRE practices
- [ ] AIOps integration

---

## 🆘 Troubleshooting

### Pod no inicia

```bash
kubectl describe pod POD_NAME -n techwave
kubectl logs POD_NAME -n techwave
kubectl get events -n techwave --sort-by='.lastTimestamp'
```

### Health check falla

```bash
kubectl port-forward pod/POD_NAME 3000:3000 -n techwave
curl http://localhost:3000/health
```

### Métricas no se recopilan

```bash
# Verificar endpoint
curl http://service-ip:3000/metrics

# Ver ServiceMonitor
kubectl get servicemonitor -n techwave

# Logs de Prometheus
kubectl logs -f -l app=prometheus -n monitoring
```

### Rollback de despliegue

```bash
# Historial
kubectl rollout history deployment/techwave-blue -n techwave

# Deshacer
kubectl rollout undo deployment/techwave-blue -n techwave
```

---

## 📚 Documentación Adicional

- 📖 [Terraform README](./terraform/README.md) - Infraestructura detallada
- 📖 [Monitoring README](./monitoring/README) - Stack de observabilidad
- 📖 [Kubernetes Docs](https://kubernetes.io/es/docs/) - Documentación oficial
- 📖 [Docker Docs](https://docs.docker.com/) - Guía de contenedores
- 📖 [GitHub Actions](https://docs.github.com/actions) - CI/CD oficial

---

## 📞 Contacto & Soporte

| Información | Detalles |
|------------|---------|
| 👤 **Autor** | Fernando Martínez Altolaguirre |
| 🔗 **GitHub** | [@fmartinezaltolaguirre](https://github.com/fmartinezaltolaguirre) |
| 📚 **Institución** | Tokio School |
| 📌 **Repositorio** | [pf-devops-kubernetes](https://github.com/fmartinezaltolaguirre/pf-devops-kubernetes) |

---

## 📄 Licencia

Este proyecto tiene fines académicos y formativos dentro del programa de especialización **DevOps de Tokio School**.

Licencia: **ISC**

---

## 🙏 Agradecimientos

Este proyecto fue desarrollado como **Proyecto Final** del programa DevOps de Tokio School, combinando:

- ✨ Las mejores prácticas de DevOps moderno
- ☁️ Tecnologías Cloud-Native
- 🔐 Patrones de deployment seguro
- 📊 Observabilidad de clase empresarial

Gracias a la comunidad de:
- 🐳 Docker
- ☸️ Kubernetes
- 🏗️ Terraform
- 🔄 GitHub
- 📡 Prometheus
- Open Source en general

---

## 📊 Diagrama de Decisiones Arquitectónicas

```
Requisito: Despliegue sin downtime
├─ Opción A: Rolling Update ❌
│  └─ Problema: Requiere versión compatible
├─ Opción B: Blue-Green ✅ SELECCIONADA
│  └─ Ventaja: Switchover instantáneo
└─ Opción C: Canary ⚠️
   └─ Problema: Más complejo de mantener

Requisito: Observabilidad
├─ Opción A: Solo logs ❌
├─ Opción B: Prometheus + Grafana ✅ SELECCIONADA
│  └─ Ventaja: Métricas + Alertas
└─ Opción C: Logging centralizado ⚠️

Requisito: IaC
├─ Opción A: CloudFormation ⚠️
├─ Opción B: Terraform ✅ SELECCIONADA
│  └─ Ventaja: Multi-cloud
└─ Opción C: Manual ❌
```

---

## 📊 Estado del Proyecto

```
Componente              Estado       Cobertura
────────────────────────────────────────────────
Aplicación              ✅ Completo      100%
Docker                  ✅ Completo      100%
Kubernetes              ✅ Completo      100%
Blue-Green              ✅ Completo      100%
CI/CD                   ✅ Completo      100%
GitHub Actions          ✅ Completo      100%
Prometheus              ✅ Configurado    100%
Grafana                 🚧 Diseñado       80%
Loki                    🚧 Diseñado       80%
OpenTelemetry           🚧 Diseñado       60%
Terraform               🚧 En desarrollo  70%
Documentación           ✅ Completa      100%
────────────────────────────────────────────────
PROYECTO GENERAL        ✅ FUNCIONAL     95%
```

---

**¡Gracias por usar TechWave DevOps Platform! 🚀**

Made with ❤️ by Fernando Martínez Altolaguirre

# 🚀 TechWave DevOps Platform

Proyecto Final DevOps – Diseño e Implementación de una Plataforma Cloud Native utilizando Docker, Kubernetes, GitHub Actions y Blue-Green Deployment.

## 📋 Descripción

TechWave DevOps Platform es una aplicación desarrollada para demostrar la implantación de una plataforma DevOps moderna basada en tecnologías Cloud Native.

La solución integra prácticas DevOps y herramientas de automatización para garantizar un ciclo de vida de software seguro, reproducible y escalable.

### Componentes principales

- Node.js y Express para el desarrollo de la aplicación.
- Docker para la contenerización.
- GitHub como repositorio de código fuente.
- GitHub Actions para la automatización CI/CD.
- GitHub Container Registry (GHCR) para el almacenamiento de imágenes.
- Kubernetes para la orquestación.
- ConfigMaps y Secrets para la gestión de configuración.
- Despliegue Blue-Green para minimizar interrupciones.
- Endpoint de métricas compatible con Prometheus.

---

## 🏗️ Arquitectura

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
GitHub Container Registry
    │
    ▼
Kubernetes Cluster
    │
 ┌──┴──┐
 ▼     ▼
Blue  Green
    │
    ▼
Service
    │
    ▼
Application
```

La aplicación se despliega mediante una estrategia Blue-Green utilizando dos Deployments independientes dentro del namespace `techwave`.

---

## ⚙️ Tecnologías Utilizadas

### Desarrollo

- Node.js
- Express.js

### Testing

- Jest
- Supertest

### Contenerización

- Docker
- GitHub Container Registry (GHCR)

### Integración y Entrega Continua

- GitHub Actions

### Kubernetes

- Namespace
- Deployments
- Services
- ConfigMaps
- Secrets
- Readiness Probes
- Liveness Probes

### Observabilidad

- Prometheus Client
- Endpoint `/metrics`

---

## 🌐 Endpoints Disponibles

### Endpoint Principal

```http
GET /
```

Respuesta:

```json
{
  "application": "TechWave DevOps Platform",
  "status": "running"
}
```

### Health Check

```http
GET /health
```

Respuesta:

```json
{
  "status": "UP"
}
```

### Version

```http
GET /version
```

Respuesta:

```json
{
  "version": "1.0.0"
}
```

### Métricas Prometheus

```http
GET /metrics
```

Expone métricas relacionadas con:

- CPU
- Memoria
- Event Loop
- Garbage Collector
- Recursos Node.js

---

## 🐳 Docker

### Construcción de imagen

```bash
docker build -t techwave-app .
```

### Ejecución local

```bash
docker run -p 3000:3000 techwave-app
```

---

## ☸️ Kubernetes

### Crear Namespace

```bash
kubectl apply -f namespace.yaml
```

### Configuración

```bash
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
```

### Despliegues

```bash
kubectl apply -f deployment-blue.yaml
kubectl apply -f deployment-green.yaml
```

### Servicio

```bash
kubectl apply -f service.yaml
```

### Validación

```bash
kubectl get all -n techwave
```

### Exposición temporal mediante Port-Forward

```bash
kubectl port-forward service/techwave-service 8081:80 -n techwave
```

Acceso:

```text
http://localhost:8081
```

---

## 🔵🟢 Blue-Green Deployment

La estrategia Blue-Green permite mantener dos entornos simultáneos:

```text
techwave-blue
techwave-green
```

### Beneficios

- Despliegues sin interrupción.
- Reducción del riesgo operacional.
- Validación previa de nuevas versiones.
- Recuperación rápida ante incidencias.
- Mayor disponibilidad del servicio.

---

## 🔄 Pipeline CI/CD

GitHub Actions automatiza:

1. Validación del código.
2. Ejecución de pruebas.
3. Construcción de la imagen Docker.
4. Publicación en GitHub Container Registry.
5. Preparación del despliegue en Kubernetes.

### Flujo

```text
Commit
   │
   ▼
GitHub Actions
   │
   ▼
Docker Build
   │
   ▼
GHCR
   │
   ▼
Kubernetes
```

---

## 📊 Observabilidad

La aplicación incorpora instrumentación mediante Prometheus Client para Node.js.

Las métricas son accesibles desde:

```text
/metrics
```

Entre las métricas disponibles se incluyen:

- process_cpu_user_seconds_total
- process_resident_memory_bytes
- nodejs_eventloop_lag_seconds
- nodejs_heap_size_used_bytes
- nodejs_gc_duration_seconds

La arquitectura contempla futuras integraciones con:

- Prometheus
- Grafana
- Loki
- OpenTelemetry

---

## ✅ Estado Actual del Proyecto

### Implementado

- Aplicación Node.js
- Docker
- GitHub
- GitHub Actions
- GitHub Container Registry
- Kubernetes
- Blue-Green Deployment
- ConfigMap
- Secret
- Liveness Probe
- Readiness Probe
- Endpoint `/health`
- Endpoint `/version`
- Endpoint `/metrics`
- Observabilidad básica mediante Prometheus Client

### Próximas Evoluciones


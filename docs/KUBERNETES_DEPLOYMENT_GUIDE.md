# 📖 Guía práctica de despliegue en Kubernetes

Esta guía proporciona instrucciones paso a paso para desplegar la aplicación TechWave DevOps Platform en un clúster Kubernetes.

---

## 📋 Prerequisitos

Antes de comenzar, verifica que cuentas con:

- ✅ Clúster Kubernetes operativo (`minikube`, `Docker Desktop`, `EKS`, `AKS`, etc.)
- ✅ `kubectl` instalado y configurado
- ✅ Acceso al repositorio del proyecto
- ✅ Imagen Docker disponible (`ghcr.io/fmartinezaltolaguirre/techwave-app` o local)

### Verificar kubectl

```bash
kubectl cluster-info
kubectl version --client
```

---

## 🏗️ Estructura de manifiestos

Los manifiestos están organizados en `app/k8s/`:

```text
app/k8s/
├── namespace.yaml          # Namespace de aislamiento
├── configmap.yaml          # Configuración de la app
├── secret.yaml             # Secretos (credenciales)
├── deployment-blue.yaml    # Deployment Blue (activo)
├── deployment-green.yaml   # Deployment Green (standby)
├── service.yaml            # Exposición interna (ClusterIP)
└── ingress.yaml            # Acceso externo (Ingress)
```

---

## 🚀 Pasos de despliegue

### 1️⃣ Crear el Namespace

El namespace `techwave` aísla todos los recursos de la aplicación.

```bash
kubectl apply -f app/k8s/namespace.yaml
```

**Verificar:**

```bash
kubectl get namespaces | grep techwave
```

**Salida esperada:**

```text
techwave        Active   2m
```

---

### 2️⃣ Aplicar ConfigMap

El ConfigMap contiene la configuración básica de la aplicación:

```bash
kubectl apply -f app/k8s/configmap.yaml
```

**Ver contenido:**

```bash
kubectl get configmap -n techwave
kubectl describe configmap techwave-config -n techwave
```

**Contenido:**

```text
APP_NAME=TechWave DevOps Platform
APP_ENV=kubernetes
APP_VERSION=1.0.0
```

---

### 3️⃣ Crear Secrets

Los Secrets almacenan datos sensibles (API keys, credenciales, etc.):

```bash
kubectl apply -f app/k8s/secret.yaml
```

**Ver lista:**

```bash
kubectl get secrets -n techwave
```

⚠️ **Nota de seguridad**: Los Secrets en Kubernetes solo están codificados en base64, no encriptados. Para producción, usa:
- Kubernetes Secrets con cifrado en reposo
- AWS Secrets Manager / HashiCorp Vault
- Sealed Secrets / Kyverno

---

### 4️⃣ Desplegar Blue (Versión activa)

El deployment Blue es la versión activa que recibe tráfico:

```bash
kubectl apply -f app/k8s/deployment-blue.yaml
```

**Esperar a que esté listo:**

```bash
kubectl rollout status deployment/techwave-blue -n techwave --timeout=5m
```

**Verificar pods:**

```bash
kubectl get pods -n techwave -l version=blue
```

**Salida esperada:**

```text
NAME                              READY   STATUS    RESTARTS   AGE
techwave-blue-6d4f7b9c8c-abc12    1/1     Running   0          2m
techwave-blue-6d4f7b9c8c-xyz78    1/1     Running   0          2m
```

---

### 5️⃣ Desplegar Green (Versión standby)

Green es la nueva versión, lista pero sin tráfico:

```bash
kubectl apply -f app/k8s/deployment-green.yaml
```

**Verificar:**

```bash
kubectl get pods -n techwave -l version=green
```

---

### 6️⃣ Crear Service

El Service expone internamente los pods bajo un nombre DNS estable:

```bash
kubectl apply -f app/k8s/service.yaml
```

**Verificar:**

```bash
kubectl get svc -n techwave
```

**Salida esperada:**

```text
NAME                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
techwave-service    ClusterIP   10.100.200.50   <none>        80/TCP,9090/TCP  1m
```

El Service expone dos puertos:
- Puerto 80 → aplicación (puerto 3000 del pod)
- Puerto 9090 → métricas Prometheus (también puerto 3000 del pod)

---

### 7️⃣ Aplicar Ingress (opcional)

El Ingress expone la aplicación externamente:

```bash
kubectl apply -f app/k8s/ingress.yaml
```

**Requisitos:**

- El clúster debe tener Ingress Controller (NGINX, Traefik, etc.)
- En Minikube, habilitar NGINX:

```bash
minikube addons enable ingress
```

**En Docker Desktop:**

```bash
# Ya viene instalado por defecto
```

**Verificar:**

```bash
kubectl get ingress -n techwave
```

**Acceso:**

```bash
# Añadir entrada en /etc/hosts (o C:\Windows\System32\drivers\etc\hosts en Windows)
127.0.0.1 techwave.local

# Acceder
curl http://techwave.local
```

---

## ✅ Verificar el despliegue completo

### Ver todos los recursos

```bash
kubectl get all -n techwave
```

**Salida esperada:**

```text
NAME                                  READY   STATUS    RESTARTS   AGE
pod/techwave-blue-6d4f7b9c8c-abc12    1/1     Running   0          5m
pod/techwave-blue-6d4f7b9c8c-xyz78    1/1     Running   0          5m
pod/techwave-green-8e9f3b1c2d-def34   1/1     Running   0          3m

NAME                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/techwave-service  ClusterIP   10.100.200.50   <none>        80/TCP,9090/TCP  4m

NAME                            READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/techwave-blue   2/2     2            2           5m
deployment.apps/techwave-green  2/2     2            2           3m
```

### Validar health check

```bash
# Port-forward al servicio
kubectl port-forward svc/techwave-service 8080:80 -n techwave &

# En otra terminal
curl http://localhost:8080/health
```

**Respuesta esperada:**

```json
{"status":"UP"}
```

### Validar métricas

```bash
curl http://localhost:8080/metrics | head -20
```

**Salida esperada:**

```text
# HELP techwave_http_requests_total Total number of HTTP requests
# TYPE techwave_http_requests_total counter
techwave_http_requests_total{method="GET",route="/health",status_code="200"} 12
```

### Ver logs de un pod

```bash
kubectl logs -f deployment/techwave-blue -n techwave
```

---

## 🔵🟢 Cambio de tráfico Blue/Green

### Escenario: Promover Green a producción

1️⃣ **Verificar que Green está Ready:**

```bash
kubectl get pods -n techwave -l version=green
```

2️⃣ **Ejecutar smoke tests:**

```bash
kubectl port-forward svc/techwave-service 8080:80 -n techwave &
curl http://localhost:8080/health
curl http://localhost:8080/version
```

3️⃣ **Cambiar selector del Service de Blue a Green:**

```bash
kubectl patch service techwave-service -n techwave \
  -p '{"spec":{"selector":{"version":"green"}}}'
```

4️⃣ **Verificar que el tráfico fluye a Green:**

```bash
kubectl get endpoints -n techwave
```

5️⃣ **Si algo falla, revertir inmediatamente:**

```bash
kubectl patch service techwave-service -n techwave \
  -p '{"spec":{"selector":{"version":"blue"}}}'
```

---

## 🔄 Actualizar la aplicación

### Cambiar la imagen de un deployment

```bash
# Actualizar la imagen en Blue
kubectl set image deployment/techwave-blue \
  -n techwave \
  techwave=ghcr.io/fmartinezaltolaguirre/techwave-app:v1.1.0

# Esperar a que se complete
kubectl rollout status deployment/techwave-blue -n techwave
```

### Ver historial de cambios

```bash
kubectl rollout history deployment/techwave-blue -n techwave
```

### Deshacer cambios

```bash
kubectl rollout undo deployment/techwave-blue -n techwave
kubectl rollout status deployment/techwave-blue -n techwave
```

---

## 🛠️ Troubleshooting

### Pod no inicia

```bash
# Ver descripción detallada
kubectl describe pod POD_NAME -n techwave

# Ver logs
kubectl logs POD_NAME -n techwave

# Ver eventos del namespace
kubectl get events -n techwave --sort-by='.lastTimestamp'
```

### Health check falla

```bash
# Conectar al pod
kubectl exec -it POD_NAME -n techwave -- /bin/sh

# Dentro del pod
curl http://localhost:3000/health
```

### Service no resuelve

```bash
# Dentro del pod
nslookup techwave-service
nslookup techwave-service.techwave.svc.cluster.local
```

### Ver consumo de recursos

```bash
kubectl top pods -n techwave
kubectl top nodes
```

---

## 📊 Monitoreo

### Ver logs en tiempo real

```bash
# Todos los pods de Blue
kubectl logs -f -l app=techwave,version=blue -n techwave

# Último número de líneas
kubectl logs -f deployment/techwave-blue -n techwave --tail=50
```

### Acceder al dashboard de Kubernetes

```bash
# Minikube
minikube dashboard

# Otros
kubectl proxy
# Acceder a http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/
```

### Ver eventos

```bash
kubectl get events -n techwave -w  # Watch mode
```

---

## 🗑️ Limpiar recursos

### Eliminar todo en el namespace

```bash
kubectl delete namespace techwave
```

### Eliminar recursos específicos

```bash
kubectl delete deployment techwave-blue -n techwave
kubectl delete svc techwave-service -n techwave
kubectl delete configmap techwave-config -n techwave
```

---

## 📋 Checklist de despliegue

- [ ] Namespace creado
- [ ] ConfigMap aplicado
- [ ] Secrets creados
- [ ] Deployment Blue running (2/2 pods)
- [ ] Deployment Green running (2/2 pods)
- [ ] Service creado
- [ ] Health check responde
- [ ] Métricas disponibles en `/metrics`
- [ ] Ingress configurado (opcional)
- [ ] Port-forward funciona
- [ ] Blue recibe tráfico

---

## 🔐 Notas de seguridad para producción

1. **Secrets**: Migrar a cifrado en reposo o gestión externa
2. **RBAC**: Aplicar ServiceAccounts y Roles restrictivos
3. **Network Policy**: Restringir tráfico entre pods
4. **Resource Limits**: Ya aplicados, pero revisar según carga real
5. **Pod Security Policy**: Aplicar si es necesario
6. **Audit Logging**: Habilitar logs de auditoría
7. **Scanning**: Escanear imágenes antes de desplegar

---

## 📚 Referencias rápidas

```bash
# Despliegue completo en 1 comando
kubectl apply -f app/k8s/

# Ver todo
kubectl get all -n techwave

# Logs en vivo
kubectl logs -f deployment/techwave-blue -n techwave

# Port-forward
kubectl port-forward svc/techwave-service 8080:80 -n techwave

# Describe un recurso
kubectl describe deployment techwave-blue -n techwave

# Editar en vivo
kubectl edit deployment techwave-blue -n techwave

# Escalar réplicas
kubectl scale deployment techwave-blue --replicas=5 -n techwave
```

---

**Última actualización**: Septiembre 2026  
**Proyecto**: TechWave DevOps Platform  
**Autor**: Fernando Martínez Altolaguirre

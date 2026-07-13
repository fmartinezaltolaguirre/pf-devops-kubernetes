const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>TechWave DevOps Platform</title>

<style>

body{
    margin:0;
    font-family:Segoe UI,Arial,sans-serif;
    background:#0f172a;
    color:#ffffff;
}

.header{
    background:#111827;
    padding:20px;
    border-bottom:1px solid #334155;
}

.header h1{
    margin:0;
    color:#38bdf8;
}

.container{
    max-width:1200px;
    margin:auto;
    padding:30px;
}

.cards{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:20px;
    margin-top:20px;
}

.card{
    background:#1e293b;
    border-radius:12px;
    padding:20px;
    box-shadow:0 2px 12px rgba(0,0,0,.3);
}

.card h3{
    margin-top:0;
    color:#38bdf8;
}

.status{
    color:#22c55e;
    font-weight:bold;
}

.links{
    margin-top:30px;
}

.links a{
    display:inline-block;
    margin-right:15px;
    padding:12px 18px;
    text-decoration:none;
    background:#2563eb;
    color:white;
    border-radius:8px;
}

.footer{
    margin-top:40px;
    color:#94a3b8;
}

</style>

</head>

<body>

<div class="header">
    <h1>🚀 TechWave DevOps Platform</h1>
</div>

<div class="container">

    <h2>Panel de Estado</h2>

    <div class="cards">

        <div class="card">
            <h3>Aplicación</h3>
            <p>TechWave DevOps Platform</p>
        </div>

        <div class="card">
            <h3>Versión</h3>
            <p>1.0.0</p>
        </div>

        <div class="card">
            <h3>Estado</h3>
            <p class="status">UP</p>
        </div>

        <div class="card">
            <h3>Orquestación</h3>
            <p>Kubernetes</p>
        </div>

        <div class="card">
            <h3>Despliegue</h3>
            <p>Blue / Green</p>
        </div>

        <div class="card">
            <h3>CI/CD</h3>
            <p>GitHub Actions</p>
        </div>

    </div>

    <div class="links">

        <a href="/health">Health Check</a>

        <a href="/version">Version</a>

        <a href="/metrics">Metrics</a>

    </div>

    <div class="footer">

        <p>
        Docker • Kubernetes • GitHub Actions • GHCR • Prometheus
        </p>

        <p>
        Proyecto Final DevOps - Fernando Martínez Altolaguirre
        </p>

    </div>

</div>

</body>
</html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.get("/version", (req, res) => {
  res.json({ version: "1.0.0" });
});

module.exports = app;

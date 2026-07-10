app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>TechWave DevOps Platform</title>
      </head>
      <body>
        <h1>🚀 TechWave DevOps Platform</h1>

        <p>Aplicación desplegada en Kubernetes.</p>

        <ul>
          <li>/health</li>
          <li>/version</li>
          <li>/metrics</li>
        </ul>
      </body>
    </html>
  `);
});

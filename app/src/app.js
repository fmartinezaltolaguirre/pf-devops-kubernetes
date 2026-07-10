const express = require("express");
const client = require("prom-client");

const app = express();

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

app.get("/", (req, res) => {
  res.json({
    application: "TechWave DevOps Platform",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP"
  });
});

app.get("/version", (req, res) => {
  res.json({
    version: "1.0.0"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

module.exports = app;

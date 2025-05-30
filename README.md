
# 🛡️ Monitoring Service

Este microservicio forma parte del sistema distribuido del Taller 2 y tiene como objetivo **registrar eventos de acciones y errores** provenientes de otros microservicios, para fines de auditoría, trazabilidad y monitoreo.

---

## 📌 Funcionalidades

- Registra logs de acciones realizadas por los usuarios (create, update, delete).
- Registra logs de errores ocurridos en los otros microservicios.
- Expone un servidor gRPC para listar acciones (`ListActions`) y errores (`ListErrors`).
- Escucha eventos desde RabbitMQ para `logs.action` y `logs.error`.

---

## 📦 Estructura del proyecto

```
monitoringService/
│
├── src/
│   ├── controllers/         # Implementación de servicios gRPC
│   ├── database/            # Conexión y modelos de MongoDB
│   ├── protos/              # Archivos .proto gRPC
│   ├── queue/               # Configuración y consumidores de RabbitMQ
│   └── utils/               # Utilidades (loadProto, etc.)
│
├── .env                     # Variables de entorno
├── Dockerfile               # Imagen Docker del servicio
├── docker-compose.yml       # Orquestación de servicios
├── app.js                   # Punto de entrada
└── README.md                # Documentación
```

---

## 🚀 Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/Taller2-AS/invoices-service.git
cd invoicesService
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Variables de entorno

Crear un archivo `.env`:

```env
# gRPC
GRPC_PORT=50053
SERVER_URL=localhost

# MongoDB
MONGODB_URI=mongodb://admin:root@localhost:27018/monitoring?authSource=admin

# RabbitMQ
RABBITMQ_URL=amqp://admin:admin@localhost:5672

```

---

### 4. Levanta MariaDB y RabbitMQ con Docker

```bash
docker-compose up -d
```

> Si ya tienes una instancia única de RabbitMQ corriendo en otro microservicio, puedes omitir levantarla aquí.

---

### 6. Inicia el microservicio

```bash
npm start
```

---

## 🐇 RabbitMQ

Este servicio escucha las siguientes colas:

- `logs.action`: eventos de acciones
- `logs.error`: eventos de errores

---

## 🧱 Base de datos

Este servicio usa MongoDB con los siguientes esquemas:

- `ActionLog`: para logs de acciones
- `ErrorLog`: para logs de errores

---

## 🛠️ Tecnologías

- Node.js
- gRPC
- RabbitMQ
- MongoDB
- Docker

---

## 📬 Desarrollador

Kevin Araya  
Universidad Católica del Norte  
Desarrollador B - Taller 2  

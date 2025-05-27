const mongoose = require('mongoose');
const dotenv = require('dotenv');
const grpc = require('@grpc/grpc-js');
const loadProto = require('./src/utils/loadProto');
const monitoringService = require('./src/services/monitoringService');
const initializeQueueConsumers = require('./src/queue');

dotenv.config({ path: './.env' });

// Conexión a MongoDB
const DB = process.env.MONGODB_URI;

mongoose.connect(DB)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  });

// Inicializar consumidores de RabbitMQ
initializeQueueConsumers()
  .then(() => console.log('✅ RabbitMQ Consumers inicializados'))
  .catch(err => {
    console.error('❌ Error iniciando consumidores:');
    console.error(err);
  });

// Servidor gRPC
const server = new grpc.Server();
const proto = loadProto('monitoring');

server.addService(proto.MonitoringService.service, monitoringService);


const PORT = process.env.GRPC_PORT || 50053;
const HOST = process.env.SERVER_URL || 'localhost';

server.bindAsync(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('❌ Fallo al iniciar servidor gRPC:', err.message);
    return;
  }
  console.log(`🚀 Servidor gRPC de monitoreo escuchando en ${HOST}:${port}`);
  server.start();
});

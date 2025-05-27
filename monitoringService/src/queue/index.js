const amqp = require('amqplib');
const Action = require('../database/models/actionModel');
const ErrorModel = require('../database/models/errorModel');

module.exports = async function initializeQueueConsumers() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue('logs.action');
  await channel.assertQueue('logs.error');

  channel.consume('logs.action', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    await Action.create(data);
    channel.ack(msg);
  });

  channel.consume('logs.error', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    await ErrorModel.create(data);
    channel.ack(msg);
  });
};

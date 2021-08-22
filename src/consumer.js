const { Kafka } = require("kafkajs");
const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry')

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const registry = new SchemaRegistry({ host: 'http://localhost:8081' });

const consumer = kafka.consumer({ groupId: "test-group" });

(async () => {
  const topic = "document.notification-v1";
  await consumer.connect();
  await consumer.subscribe({
    topic,
    // fromBeginning: true 
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Message come', message);

      const decodedMessage = {
        ...message,
        value: await registry.decode(message.value)
      }
      console.log('decodedMessage', decodedMessage);
    },
  });
})();

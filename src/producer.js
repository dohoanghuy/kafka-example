const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

(async () => {
  const topic = "document.notification-v1";
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: "Hello KafkaJS user!" }],
  });

  await producer.disconnect();
})();

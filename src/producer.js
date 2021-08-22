const { Kafka } = require("kafkajs");
const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry')

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const registry = new SchemaRegistry({ host: 'http://localhost:8081' });

const producer = kafka.producer();

const topic = "document.notification-v1";
const subject = "document.notification-v1";
const key = "document.notification-v1-key";

const producePlainMsg = async () => {
  await producer.send({
    topic,
    messages: [{ value: "Hello KafkaJS user!" }],
  });
}

const produceSchemaMsg = async (schemaId) => {
  const payload = { my_field1: 123, my_field2: 111, my_field3: "my_field3" }
  const encodedPayload = await registry.encode(schemaId, payload);
  const outgoingMessage = {
    key,
    value: encodedPayload
  }

  await producer.send({
    topic,
    messages: [outgoingMessage],
  });
}

(async () => {
  try {
    const schemaId = await registry.getLatestSchemaId(subject);
    console.log('schemaId', schemaId);

    await producer.connect();

    // await producePlainMsg(topic);
    await produceSchemaMsg(schemaId);

    await producer.disconnect(schemaId);
  } catch (error) {
    console.log('Error happened', error);
  }
})();

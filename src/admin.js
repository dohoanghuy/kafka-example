const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
});

const admin = kafka.admin();

// https://kafka.js.org/docs/admin
(async () => {
    // remember to connect and disconnect when you are done
    await admin.connect();

    console.log(await admin.listTopics());
    console.log(await admin.listGroups());

    await admin.disconnect();
})();

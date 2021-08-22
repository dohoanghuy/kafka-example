// https://kafkajs.github.io/confluent-schema-registry/docs/introduction

const { SchemaRegistry, SchemaType, COMPATIBILITY, readAVSCAsync } = require('@kafkajs/confluent-schema-registry')

const registry = new SchemaRegistry({ host: 'http://localhost:8081' });
const subject = "document.notification-v1";
const schema = `
{
    "type": "record",
    "namespace": "com.mycorp.mynamespace",
    "name": "sampleRecord",
    "doc": "Sample schema to help you get started.",
    "fields": [
      {
        "name": "my_field1",
        "type": "int",
        "doc": "The int type is a 32-bit signed integer."
      },
      {
        "name": "my_field2",
        "type": "double",
        "doc": "The double type is a double precision (64-bit) IEEE 754 floating-point number."
      },
      {
        "name": "my_field3",
        "type": "string",
        "doc": "The string is a unicode character sequence."
      }
    ]
}`;

(async () => {
    const options = {
        subject,
        compatibility: COMPATIBILITY.FULL_TRANSITIVE
    };

    // Registry new schema
    // await registry.register({ type: SchemaType.AVRO, schema }, options);

    const id = await registry.getLatestSchemaId(subject);
    console.log(id);

    const schemaWithId = await registry.getSchema(id);
    console.log(schemaWithId);
})();
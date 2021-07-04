# KAFKA example

## Start single Zookeeper / Single Kafka

Run:

```
docker-compose -f docker-compose.yml up
docker-compose -f docker-compose.yml down
```

Test topic:
```
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 3 --topic my-topic
kafka-topics --list --zookeeper localhost:2181
kafka-topics --zookeeper localhost:2181 --delete --topic my-topic
kafka-topics --zookeeper localhost:2181 --describe --topic cc_payments
```

Test producer:
```
kafka-console-producer --broker-list localhost:9092 --topic my-topic
kafka-avro-console-producer --broker-list localhost:9092 --topic my-topic --property value.schema='{"type":"record","name":"myrecord","fields":[{"name":"f1","type":"string"}]}' --property schema.registry.url=http://localhost:8081
```

Test consumer:
```
kafka-console-consumer --bootstrap-server localhost:9092 --topic my-topic --from-beginning
kafka-console-consumer --bootstrap-server localhost:9092 --topic my-topic --new-consumer --consumer-property group.id=my-group
```

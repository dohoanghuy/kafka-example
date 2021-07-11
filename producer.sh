# avro producer
docker-compose exec schema-registry kafka-avro-console-producer \
                            --broker-list broker:9092 \
                            --topic document.notification-v1 \
                            --property schema.registry.url=http://127.0.0.1:8081 \
                            --property value.schema='{"type":"record","name":"myrecord","fields":[{"name":"count","type":"int"}]}'

# producer
docker-compose exec schema-registry kafka-avro-console-consumer --topic document.notification-v1 \
    --bootstrap-server broker:9092 \
    --property schema.registry.url=http://127.0.0.1:8081 \
    --from-beginning
#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "Database started"

# Run the application
java -jar target/backend-0.0.1-SNAPSHOT.jar

#!/bin/sh
echo "Waiting for Postgresql to start..."

while ! nc -z db 5432; do
  sleep 1
done

echo "Postgresql started. Let's go!"

exec "$@"
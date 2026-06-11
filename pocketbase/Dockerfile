FROM ghcr.io/muchobien/pocketbase:latest

COPY pb_migrations /pb_migrations

EXPOSE 8090

# Railway injects PORT; PocketBase defaults to 8090 locally.
CMD ["/bin/sh", "-c", "/pb/pocketbase serve --http=0.0.0.0:${PORT:-8090} --dir=/pb_data --migrationsDir=/pb_migrations"]

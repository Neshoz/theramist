FROM postgres:13-alpine
ENV PGDATABASE thermonitor
ENV PGUSER postgres
ENV PGPASSWORD root
COPY scripts/*.sql /docker-entrypoint-initdb.d/
EXPOSE 5432:5432
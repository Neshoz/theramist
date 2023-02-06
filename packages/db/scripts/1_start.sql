CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE SCHEMA IF NOT EXISTS device AUTHORIZATION postgres;
GRANT ALL ON SCHEMA device TO postgres;

CREATE TYPE device_status AS ENUM ('on', 'off');
CREATE TABLE IF NOT EXISTS device.thermostat
(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  modified timestamp with time zone default current_timestamp,
  name character varying(255) NOT NULL,
  status device_status default 'on'::device_status,
  temp numeric,
  CONSTRAINT thermostat_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS device.thermostat_config
(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  modified timestamp with time zone default current_timestamp,
  CONSTRAINT config_pkey PRIMARY KEY (id)
);

CREATE TRIGGER update_thermostat_modified BEFORE UPDATE ON device.thermostat FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

INSERT INTO device.thermostat (id, name, status, temp) VALUES ('f5b194a9-0ba5-4ea6-817b-8de87ee231e3', 'Living room', 'on', 21);
INSERT INTO device.thermostat (id, name, status, temp) VALUES ('97bd646f-c987-4939-9e2e-b2b10a78ad63', 'Bedroom', 'off', 20);

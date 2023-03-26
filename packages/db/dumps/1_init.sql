SELECT 'CREATE DATABASE thermonitor'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'thermonitor')\gexec

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE SCHEMA IF NOT EXISTS device AUTHORIZATION postgres;
GRANT ALL ON SCHEMA device TO postgres;

CREATE SCHEMA IF NOT EXISTS account AUTHORIZATION postgres;
GRANT ALL ON SCHEMA account TO postgres;

CREATE TABLE account.session (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE account.session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IDX_session_expire ON account.session (expire);

CREATE TABLE IF NOT EXISTS account.user
(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created timestamp with time zone default current_timestamp,
  modified timestamp with time zone default current_timestamp,
  email character varying(255) NOT NULL unique,
  password character varying(255),
  CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TYPE device_status AS ENUM ('on', 'off');
CREATE TABLE IF NOT EXISTS device.thermostat
(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  modified timestamp with time zone default current_timestamp,
  name character varying(255) NOT NULL,
  status device_status default 'on'::device_status,
  CONSTRAINT thermostat_pkey PRIMARY KEY (id),
  CONSTRAINT user_fkey FOREIGN KEY(user_id) REFERENCES account.user(id)
);

CREATE TABLE IF NOT EXISTS device.temperature
(
  created timestamp with time zone default current_timestamp,
  temp numeric,
  thermostat_id uuid NOT NULL,
  CONSTRAINT temp_pkey PRIMARY KEY (created),
  CONSTRAINT thermostat_fkey FOREIGN KEY(thermostat_id) REFERENCES device.thermostat(id)
);

CREATE TABLE IF NOT EXISTS device.thermostat_config
(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  modified timestamp with time zone default current_timestamp,
  thermostat_id uuid NOT NULL,
  CONSTRAINT config_pkey PRIMARY KEY (id),
  CONSTRAINT thermostat_fkey FOREIGN KEY(thermostat_id) REFERENCES device.thermostat(id)
);

CREATE TRIGGER update_user_modified BEFORE UPDATE ON account.user FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_thermostat_modified BEFORE UPDATE ON device.thermostat FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_thermostat_config_modified BEFORE UPDATE ON device.thermostat_config FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

INSERT INTO account.user (id, email, password) VALUES ('597a833e-6a22-49d6-bafc-d4c264d7f3f5', 'root@example.com', '$2b$12$4ZBhr2iGJyL8hI6DC05jkulTLQLPdfohWZMObhiyztbVuoSNebkha');

INSERT INTO device.thermostat (id, user_id, name, status) VALUES ('f5b194a9-0ba5-4ea6-817b-8de87ee231e3', '597a833e-6a22-49d6-bafc-d4c264d7f3f5', 'Living room', 'on');
INSERT INTO device.thermostat (id, user_id, name, status) VALUES ('97bd646f-c987-4939-9e2e-b2b10a78ad63', '597a833e-6a22-49d6-bafc-d4c264d7f3f5', 'Bedroom', 'off');

INSERT INTO device.temperature (temp, thermostat_id) VALUES (18, 'f5b194a9-0ba5-4ea6-817b-8de87ee231e3');
INSERT INTO device.temperature (temp, thermostat_id) VALUES (29, 'f5b194a9-0ba5-4ea6-817b-8de87ee231e3');
INSERT INTO device.temperature (temp, thermostat_id) VALUES (20, 'f5b194a9-0ba5-4ea6-817b-8de87ee231e3');

INSERT INTO device.temperature (temp, thermostat_id) VALUES (20, '97bd646f-c987-4939-9e2e-b2b10a78ad63');
INSERT INTO device.temperature (temp, thermostat_id) VALUES (21, '97bd646f-c987-4939-9e2e-b2b10a78ad63');
INSERT INTO device.temperature (temp, thermostat_id) VALUES (22, '97bd646f-c987-4939-9e2e-b2b10a78ad63');
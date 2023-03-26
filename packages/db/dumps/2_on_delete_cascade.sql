ALTER TABLE device.thermostat
DROP CONSTRAINT user_fkey,
ADD CONSTRAINT user_fkey
  FOREIGN KEY(user_id)
  REFERENCES account.user(id)
  ON DELETE CASCADE;

ALTER TABLE device.temperature
DROP CONSTRAINT thermostat_fkey,
ADD CONSTRAINT thermostat_fkey
  FOREIGN KEY(thermostat_id)
  REFERENCES device.thermostat(id)
  ON DELETE CASCADE;

ALTER TABLE device.thermostat_config
DROP CONSTRAINT thermostat_fkey,
ADD CONSTRAINT thermostat_fkey
  FOREIGN KEY(thermostat_id)
  REFERENCES device.thermostat(id)
  ON DELETE CASCADE;

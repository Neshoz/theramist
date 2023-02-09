#!/bin/bash

docker-compose build && bash ./local-cluster/update-etc-hosts.sh && docker-compose up
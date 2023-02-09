#!/bin/bash

ip_address="127.0.0.1"

OS=$(uname -s)

function updateEtcHosts {
  host_name=$1

  matches_in_hosts="$(grep -n $host_name /etc/hosts | cut -f1 -d:)"
  host_entry="${ip_address}   ${host_name}"

  if [ ! -z "$matches_in_hosts" ]
  then
    echo "Updating existing hosts entry for ${host_name}"
    # Iterate over the line numbers on which matches were found
    while read -r line_number; do
      # Replace the text of each line with the desired host entry
      if [ "$OS" == "Darwin" ]; then
        sudo sed -i '' "${line_number}s/.*/${host_entry} /" /etc/hosts
      else
        sudo sed -i "${line_number}s/.*/${host_entry} /" /etc/hosts
      fi
    done <<< "$matches_in_hosts"
  else
    echo "Adding new hosts entry for ${host_name}"
    echo "$host_entry" | sudo tee -a /etc/hosts > /dev/null
  fi
}

updateEtcHosts api.thermonitor.local
updateEtcHosts app.thermonitor.local

#!/bin/bash

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <url> <status code>"
  exit 1
fi

url=$1
expected=$2

status_code=$(curl --insecure --write-out %{http_code} --silent --output /dev/null ${url})

if [[ "$status_code" -ne ${expected} ]] ; then
  echo "$url status not $expected but $status_code"
else
  exit 0
fi

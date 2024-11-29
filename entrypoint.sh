#!/bin/sh

if [ -z "$OSC_HOSTNAME" ]; then
  export ENDPOINT="http://localhost:${PORT}"
else
  export ENDPOINT="https://${OSC_HOSTNAME}"
fi

CI=true npm run alteration deploy latest

exec "$@"
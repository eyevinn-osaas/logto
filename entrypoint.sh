#!/bin/sh

EXT_PORT="${PORT:-8080}"
if [ -z "$OSC_HOSTNAME" ]; then
  SERVER_NAME="http://localhost:${EXT_PORT}"
else
  SERVER_NAME="https://${OSC_HOSTNAME}"
fi

export ENDPOINT="${SERVER_NAME}"
export ADMIN_ENDPOINT="${SERVER_NAME}"

cat > /etc/nginx/http.d/default.conf <<EOF
server {
  listen $EXT_PORT;
  server_name $SERVER_NAME;

  location ^~ /console {
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;

    proxy_pass http://127.0.0.1:3002;
  }

  location / {
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;

    proxy_pass http://127.0.0.1:3001;
  }  
}
EOF

npm run cli db seed -- --swe
CI=true npm run alteration deploy latest

TRUST_PROXY_HEADER=1 PORT=3001 npm start &
exec "$@"
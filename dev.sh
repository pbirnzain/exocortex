#!/bin/bash

if [ "$1" == "e2e" ]; then
  ./manage.py runserver --settings exocortex.settings_test &

  echo "Waiting for exocortex server to become available on Port 8000..."
  while ! nc -z localhost 8000; do
    sleep 0.1
  done
  echo "Server ready, launching e2e tests."

  cd pwa
  npm run test:e2e

  kill %1 # kill server
elif [ "$1" == "serve" ]; then
  ./manage.py runserver &
  cd pwa
  npm run serve
  kill %1 # kill server
else
  if [ "$1" == "" ]; then
    echo "Commands:"
    echo "$0 serve"
    echo "$0 e2e"
  else
    echo "$1: unknown command"
  fi
fi

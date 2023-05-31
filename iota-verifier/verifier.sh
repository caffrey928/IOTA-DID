#!/bin/bash

bash kill_verifier.sh

pnpm run start > /dev/null 2>&1 &
pnpm run server > /dev/null 2>&1 &

echo -e "Running Verifier..."
sleep 3

service=$(lsof -n -i:3002 | grep LISTEN)
server=$(lsof -n -i:8000 | grep LISTEN)

if [ "$service" != "" ] && [ "$server" != "" ]
then
    echo -e "Success to run Verifier"
else
    echo "Something went wrong running Verifier..."
    echo "Run 'pnpm run kill-verifier' to clear all related port"
fi
#!/bin/bash

bash kill_issuer.sh

npm run start > /dev/null 2>&1 &
npm run server > /dev/null 2>&1 &

echo -e "Running Issuer..."
sleep 3

service=$(lsof -n -i:3001 | grep LISTEN)
server=$(lsof -n -i:5000 | grep LISTEN)

if [ "$service" != "" ] && [ "$server" != "" ]
then
    echo -e "Success to run Issuer"
else
    echo "Something went wrong running Issuer..."
    echo "Run 'npm run kill-issuer' to clear all related port"
fi
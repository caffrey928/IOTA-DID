#!/bin/bash

bash kill_holder.sh

yarn start > /dev/null 2>&1 &
yarn server > /dev/null 2>&1 &

echo -e "Running Holder..."
sleep 3

service=$(lsof -n -i:3000 | grep LISTEN)
server=$(lsof -n -i:4000 | grep LISTEN)

if [ "$service" != "" ] && [ "$server" != "" ]
then
    echo -e "Success to run Holder"
else
    echo "Something went wrong running Holder..."
    echo "Run 'npm run kill-holder' to clear all related port"
fi
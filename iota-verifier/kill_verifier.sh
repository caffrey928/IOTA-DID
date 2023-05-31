#!/bin/bash

# check if frontend is on
service=$(lsof -n -i:3000 | grep LISTEN)

if [ "$service" != "" ]
then
    kill $(lsof -t -i:3000)
    echo -e "kill service running on 3000"
else
    echo "No service running on 3000"
fi

# check if server is on
server=$(lsof -n -i:8000 | grep LISTEN)

if [ "$server" != "" ]
then
    kill $(lsof -t -i:8000)
    echo -e "kill server running on 8000"
else
    echo "No server running on 8000"
fi

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
server=$(lsof -n -i:4000 | grep LISTEN)

if [ "$server" != "" ]
then
    kill $(lsof -t -i:4000)
    echo -e "kill server running on 4000"
else
    echo "No server running on 4000"
fi

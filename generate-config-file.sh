#!/bin/sh

if [ $# -lt 1 ]; then
    echo "Usage: $0 <api key>"
    exit 1
fi

apiConfig='{ 
    "apiKey": "'"$1"'"
}'

outputFile='src/assets/config.json'
echo $apiConfig > $outputFile


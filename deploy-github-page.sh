#!/bin/sh

if [ $# -lt 1 ]; then
    echo "Usage: $0 <api key>"
    exit 1
fi

./generate-config-file.sh $1

echo "delete docs"
rm -rf docs
echo "build project starts"
ng build --output-path docs/
cp ./docs/browser/index.html  ./docs/browser/404.html
cp ./docs/browser/*  ./docs
rm -rf ./docs/browser
echo 'build project finishes'

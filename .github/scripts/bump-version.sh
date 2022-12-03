#!/bin/bash
git fetch --all

git config --global user.email "action@github.com"
git config --global user.name "GitHub Action"
git checkout master

npm version patch

PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit ; pwd -P )
VERSION=$(npm pkg get version | cut -d "\"" -f 2)

node "${PATH}/bump-manifest-version.js" "${VERSION}"

git commit -m "${VERSION}"
git push -u origin master

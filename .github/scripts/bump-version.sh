#!/bin/bash
git fetch --all

git config --global user.email "action@github.com"
git config --global user.name "GitHub Action"
git checkout master

npm version patch --git-tag-version false

VERSION=$(npm pkg get version | cut -d "\"" -f 2)

node "./.github/scripts/bump-manifest-version.js" "${VERSION}"

git add ./public/manifest.json

git commit -m "${VERSION}"
git tag "v${VERSION}"

git push origin master
git push origin "v${VERSION}"

#!/bin/bash
git fetch origin deployments

BRANCH=$(git rev-parse --abbrev-ref HEAD)
REPORT_PATH="pull-requests/${BRANCH}/test-report"
URL="https://bd-dm.github.io/chiller/${REPORT_PATH}"

git config --global user.email "action@github.com"
git config --global user.name "GitHub Action"
git checkout origin/deployments
mkdir -p "${REPORT_PATH}"
cp -a playwright-report/. "${REPORT_PATH}"
git add "./${REPORT_PATH}/."
git commit -m "[skip ci] Deployments for ${BRANCH}"
git push origin deployments
git checkout "${BRANCH}"

echo url="${URL}" >> $GITHUB_OUTPUT

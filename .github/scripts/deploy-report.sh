#!/bin/bash
git fetch --all

PR_NUMBER=$(echo $GITHUB_REF | awk 'BEGIN { FS = "/" } ; { print $3 }')
REPORT_PATH="pull-requests/${PR_NUMBER}/test-report"
URL="https://bd-dm.github.io/chiller/${REPORT_PATH}"

git config --global user.email "action@github.com"
git config --global user.name "GitHub Action"
git checkout deployments
mkdir -p "${REPORT_PATH}"
cp -a playwright-report/. "${REPORT_PATH}"
git add "./${REPORT_PATH}/."
git commit -m "[skip ci] Deployments for PR#${PR_NUMBER}"
git push -u origin deployments

echo url="${URL}" >> $GITHUB_OUTPUT

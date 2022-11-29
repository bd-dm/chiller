BRANCH=$(git rev-parse --abbrev-ref HEAD)
REPORT_PATH="pull-requests/${BRANCH}/test-report"
URL="https://bd-dm.github.io/chiller/${REPORT_PATH}"

git config --global user.email "action@github.com"
git config --global user.name "GitHub Action"
git checkout origin/deployments
mkdir -p "${REPORT_PATH}"
cp -a playwright-report/. "${REPORT_PATH}"
git add .
git commit -m "[skip ci] Deployments for ${BRANCH}"
git push origin deployments

echo ::set-output name=url::"${URL}"

set -e

npm run build
git rm docs/* -r
rm -rf docs
mkdir docs
cp -r build/* docs/
git add docs/*
git commit -m "DEPLOY"
git push

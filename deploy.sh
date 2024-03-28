npm i
npm run build
mkdir -p docs
cp -r dist/* docs
rm -rf dist

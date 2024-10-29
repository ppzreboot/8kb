# 8kb

## Development
+ [npm workspaces & typescript](https://daveiscoding.hashnode.dev/nodejs-typescript-monorepo-via-npm-workspaces)

``` bash
git clone git@github.com:ppzreboot/8kb.git
cd 8kb
npm install

npm run build -w @8kb/scale-image-data
npm run build -w @8kb/bit.io
npm run build -w @8kb/tile
npm run dev -w app/viewer
```

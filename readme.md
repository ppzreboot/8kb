# 8kb
+ [CHR Viewer](https://ppzreboot.github.io/8kb/)

## Development
+ [npm workspaces & typescript](https://daveiscoding.hashnode.dev/nodejs-typescript-monorepo-via-npm-workspaces)

``` bash
git clone git@github.com:ppzreboot/8kb.git
cd 8kb
npm install
```

##### develop app/viewer
``` bash
npm run build -w @8kb/scale-image-data
npm run build -w @8kb/showcase
npm run build -w @8kb/bit.io
npm run build -w @8kb/tile
npm run dev -w app/viewer
```

##### deploy app/viewer
``` bash
npm run build -w @8kb/scale-image-data
npm run build -w @8kb/showcase
npm run build -w @8kb/bit.io
npm run build -w @8kb/tile
npm run build -w app/viewer
npx gh-pages -d app/viewer
```

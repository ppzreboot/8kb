import { build } from 'esbuild'

build({
  entryPoints: ['./mod.ts'],
  outdir: './',
  format: 'esm',
  minify: true,
  target: ['es2020'],
  bundle: true,
  logLevel: 'debug',
})

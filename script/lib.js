import { build } from 'esbuild'

build({
  entryPoints: ['./lib/mod.ts'],
  outdir: './lib/',
  format: 'esm',
  minify: true,
  target: ['es2020'],
  bundle: true,
  logLevel: 'debug',
})

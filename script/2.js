import { writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { context, build } from 'esbuild'

main()

function main() {
  const timestamp = new Date().getTime()
  output_html(timestamp)

  const [is_dev, is_pro] = (() => {
    const mode = process.argv[2]
    return [mode === 'dev', mode === 'pro']
  })()

  /** @type {import('esbuild').BuildOptions} */
  const options = {
    entryPoints: ['src/main.ts'],
    entryNames: '[dir]/[name]-' + timestamp,
    outdir: 'dist',

    bundle: true,
    loader: {
      '.webp': 'file',
      '.otf': 'file',
      '.ttf': 'file',
    },
    logLevel: 'debug',
  }

  if (is_dev)
    _serve(options)
  else if (is_pro)
    _build(options)
  else
    throw Error('unknown mode')
}

async function _serve(opts) {
  const ctx = await context(opts)
  await ctx.watch()
  await ctx.serve({
    servedir: 'dist',
  })
}
async function _build(opts) {
  await build(opts)
}

function output_html(timestamp) {
  rmSync('dist', { recursive: true })
  mkdirSync('dist')

  writeFileSync('dist/index.html', `
    <!doctype html>
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${}</title>
        <link href="./main-${timestamp}.css" rel="stylesheet">
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="./main-${timestamp}.js"></script>
      </body>
    </html>
  `)
}

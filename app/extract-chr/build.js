import { context, build } from 'esbuild'

const opts = {
  entryPoints: ['main.ts'],
  outdir: '.',
  bundle: true,
  logLevel: 'info',
}

if (determine_dev()) {
  const ctx = await context(opts)
  await ctx.watch()
  await ctx.serve({
    servedir: '.',
  })
} else
  build(opts)

function determine_dev() {
  switch (process.argv[2]) {
    case 'dev':
      return true
    case 'pro':
      return false
    default:
      throw Error('dev? pro?')
  }
}

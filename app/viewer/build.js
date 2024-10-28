// @ts-check

import { context } from 'esbuild'

const ctx = await context({
  entryPoints: ['main.ts'],
  outdir: '.',
  bundle: true,
  logLevel: 'info',
})

await ctx.watch()

await ctx.serve({
  servedir: '.',
})

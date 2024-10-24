import { color_8kb, type tile } from '@8kb/parse'

type RenderingContext = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D
type color_web = [number, number, number, number]
type color_map = Record<color_8kb, color_web>

export
interface I_render_tile_opts {
  tile: tile
  ctx: RenderingContext
  color_map: color_map
  dx: number
  dy: number
}
export
function render_tile(opts: I_render_tile_opts) {
  const pixels = opts.tile.map(
    color_8kb => opts.color_map[color_8kb]
  )
  const data = new Uint8ClampedArray(pixels.flat())
  const image_data = new ImageData(data, 8, 8)
  opts.ctx.putImageData(image_data, opts.dx, opts.dy)
}

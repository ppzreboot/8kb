import { color_map, parse_tile, tile2img_data } from '@8kb/tile'
import { divide } from '@8kb/bit.io'

export
async function file2img(file: File, color_map: color_map) {
  const tiles = parse_tile(await file.arrayBuffer())
  const row_length = 16 // 每行放 16 个 tile

  return tile2img_data({
    width: 8 * row_length,
    height: tiles.length / row_length * 8,
    tiles: tiles.map((data, i) => {
      const [quotient, remainder] = divide(i, row_length)
      return ({
        data,
        x: remainder * 8,
        y: quotient * 8,
        color_map,
      })
    })
  })
}
import { extract_chr } from '@8kb/extract/chr'
import { extract_tiles, I_tile } from '@8kb/extract/tile'

export
function render(ctx: CanvasRenderingContext2D, nes: Uint8Array) {
  const chr = extract_chr(nes)
  const tiles = extract_tiles(chr)
  const img_data = _render(
    tiles,
    [[255, 0, 0, 255], [0, 255, 0, 255], [0, 0, 255, 255]],
    [
      [0, 1],
      [2, 3],
    ]
  )
  ctx.putImageData(img_data!, 0, 0)
}

type I_color = [number, number, number, number]
type I_palette = [I_color, I_color, I_color]
type I_tile_index = number | undefined
function _render(tiles: I_tile[], palette: I_palette, tiles_map: I_tile_index[][]) {
  if (!tiles_map[0]?.length) return

  const pixels_per_line = tiles_map[0].length * 8
  const numbers_per_line = pixels_per_line * 4
  const line_count = tiles_map.length * 8
  const uca = new Uint8ClampedArray(numbers_per_line * line_count)

  for (let y = 0; y < tiles_map.length; y++) {
    for (let x = 0; x < tiles_map[y].length; x++) {
      const tile_index = tiles_map[y][x]
      if (tile_index === undefined) continue

      const tile = tiles[tile_index]
      for (let i = 0; i < 8; i++) {
        const tile_line = tile[i]
        for (let j = 0; j < 8; j++) {
          const color_index = tile_line[j]
          if (color_index === 3) continue // transparent

          const color = palette[color_index]
          const pixel_index = (y * 8 + i) * pixels_per_line + x * 8 + j
          uca[pixel_index * 4] = color[0]
          uca[pixel_index * 4 + 1] = color[1]
          uca[pixel_index * 4 + 2] = color[2]
          uca[pixel_index * 4 + 3] = color[3]
        }
      }
    }
  }

  return new ImageData(uca, pixels_per_line, line_count)
}

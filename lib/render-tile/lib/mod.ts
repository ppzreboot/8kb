export
interface I_render_tile_options {
  tile_canvas: ImageData
  tile: ImageData
  position?: {
    x: number
    y: number
  }
  write_transparent?: boolean
}
export
function render_tile({
  tile_canvas, tile,
  position = { x: 0, y: 0 },
  write_transparent = false,
}: I_render_tile_options) {

  const row_length = Math.min(tile.width, tile_canvas.width - position.x)
  const col_length = Math.min(tile.height, tile_canvas.height - position.y)

  let j = 0
  while (j < col_length) {
    let i = 0
    while (i < row_length) {
      const tile_index = (j * tile.width + i) * 4
      if (!write_transparent && tile.data[tile_index + 3] === 0) {
        i++
        continue
      }
      const tanvas_index = ((position.y + j) * tile_canvas.width + position.x + i) * 4

      tile_canvas.data[tanvas_index] = tile.data[tile_index]
      tile_canvas.data[tanvas_index + 1] = tile.data[tile_index + 1]
      tile_canvas.data[tanvas_index + 2] = tile.data[tile_index + 2]
      tile_canvas.data[tanvas_index + 3] = tile.data[tile_index + 3]
      i++
    }
    j++
  }
}

export
interface I_render_tile_on_grid_options {
  tile_canvas: ImageData
  tile: ImageData
  grid_position?: {
    x: number
    y: number
  }
  write_transparent?: boolean
}

export
function render_tile_on_grid({
  tile_canvas, tile,
  grid_position = { x: 0, y: 0 },
  write_transparent = false,
}: I_render_tile_on_grid_options) {
  render_tile({
    tile_canvas, tile,
    position: {
      x: grid_position.x * tile.width,
      y: grid_position.y * tile.height,
    },
    write_transparent,
  })
}

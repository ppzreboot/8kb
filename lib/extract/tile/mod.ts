/**
 * number of bytes in a tile
 * + A tile has 8*8 pixels
 * + A pixel is 2 bits
 * + A tile is 8*8*2 = 128 bits
 * + A tile is 128/8 = 16 bytes
 */
export
const nobiat = 16

/**
 * + A tile is 16 bytes
 * + A byte is a number (0~255)
 * + A tile is 16 numbers
 */
export
type I_raw_tile = [
  number, number, number, number, number, number, number, number,
  number, number, number, number, number, number, number, number,
]

/** A tile has 4 colors. */
export
type I_color = 0 | 1 | 2 | 3

/** A line of a tile. */
export
type I_alot = [
  I_color, I_color, I_color, I_color,
  I_color, I_color, I_color, I_color,
]

/** A tile has 8 rows. A tile is a I_color[8][8]. */
export
type I_tile = [
  I_alot, I_alot, I_alot, I_alot,
  I_alot, I_alot, I_alot, I_alot,
]

export
function extract_raw_tiles(data: Uint8Array): I_raw_tile[] {
  const tiles: I_raw_tile[] = []
  const tiles_sum = data.length / nobiat

  for (let i = 0; i < tiles_sum; i++)
    // @ts-ignore
    tiles.push(data.slice(i * tile_bytes, (i + 1) * tile_bytes))
  return tiles
}

export
function cook_tile(raw_tile: I_raw_tile): I_tile {
  const tile: number[][] = []
  let line: number[] = [] // to store a line of colors
  for(let i = 0; i < raw_tile.length; i++) {
    if (line.length === 8) { // complete a line
      tile.push(line)
      line = []
    }
    line.push(0b11 & raw_tile[i]) // retrieve the last 2 bits
    line.push(0b11 & (raw_tile[i] >> 2)) // 2 bits to right, then retrieve
    line.push(0b11 & (raw_tile[i] >> 4)) // 4 bits to right, then retrieve
    line.push(raw_tile[i] >> 6) // 6 bits to right
  }
  return tile as I_tile
}

export
function extract_tiles(data: Uint8Array): I_tile[] {
  return extract_raw_tiles(data).map(cook_tile)
}

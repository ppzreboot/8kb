/**
 * Number Of Bytes In A Tile
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
 * 
 * + A tile has 8x8 px
 * + A number is 4 px
 */
export
type I_raw_tile = [
  number, number, number, number, number, number, number, number,
  number, number, number, number, number, number, number, number,
]

/** A tile has 4 colors. */
export
type I_color = 0 | 1 | 2 | 3

/** A tile is a I_color[64]. */
export
type I_tile = [
  I_color, I_color, I_color, I_color, I_color, I_color, I_color, I_color,
  I_color, I_color, I_color, I_color, I_color, I_color, I_color, I_color,
  I_color, I_color, I_color, I_color, I_color, I_color, I_color, I_color,
  I_color, I_color, I_color, I_color, I_color, I_color, I_color, I_color,
  I_color, I_color, I_color, I_color, I_color, I_color, I_color, I_color,
  I_color, I_color, I_color, I_color, I_color, I_color, I_color, I_color,
  I_color, I_color, I_color, I_color, I_color, I_color, I_color, I_color,
  I_color, I_color, I_color, I_color, I_color, I_color, I_color, I_color,
]

export
function extract_raw_tile(ua: Uint8Array, index: number): I_raw_tile {
  // @ts-ignore
  return ua.slice(index * nobiat, (index + 1) * nobiat)
}

export
function extract_raw_tiles(data: Uint8Array): I_raw_tile[] {
  const tiles: I_raw_tile[] = []
  const tiles_sum = data.length / nobiat

  for (let i = 0; i < tiles_sum; i++)
    tiles.push(extract_raw_tile(data, i))
  return tiles
}

export
function cook_tile(raw_tile: I_raw_tile): I_tile {
  const tile: number[] = []
  for(let i = 0; i < 8; i++) {
    let left = raw_tile[i]
    let right = raw_tile[i + 8]
    tile.push(((left & 0b10000000) >> 6) | ((right & 0b10000000) >> 7))
    tile.push(((left & 0b01000000) >> 5) | ((right & 0b01000000) >> 6))
    tile.push(((left & 0b00100000) >> 4) | ((right & 0b00100000) >> 5))
    tile.push(((left & 0b00010000) >> 3) | ((right & 0b00010000) >> 4))
    tile.push(((left & 0b00001000) >> 2) | ((right & 0b00001000) >> 3))
    tile.push(((left & 0b00000100) >> 1) | ((right & 0b00000100) >> 2))
    tile.push(((left & 0b00000010)     ) | ((right & 0b00000010) >> 1))
    tile.push(((left & 0b00000001) << 1) | ((right & 0b00000001)     ))
  }
  return tile as I_tile
}

export
function extract_tiles(data: Uint8Array): I_tile[] {
  return extract_raw_tiles(data).map(cook_tile)
}

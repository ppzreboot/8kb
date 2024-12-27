/**
 * + A tile has 8*8 pixels
 * + A pixel is 2 bits
 * + A tile is 8*8*2 = 128 bits
 * + A tile is 128/8 = 16 bytes
 */
export
const num_of_bytes_in_a_tile = 16

/**
 * + A tile is 16 bytes
 * + A byte is a number (0~255)
 * + A tile is 16 numbers
 */
export
type I_tile = [
  number, number, number, number, number, number, number, number,
  number, number, number, number, number, number, number, number,
]

export
function extract_tiles(data: Uint8Array): I_tile[] {
  const tiles: I_tile[] = []
  const tiles_sum = data.length / num_of_bytes_in_a_tile

  for (let i = 0; i < tiles_sum; i++)
    // @ts-ignore
    tiles.push(data.slice(i * tile_bytes, (i + 1) * tile_bytes))
  return tiles
}

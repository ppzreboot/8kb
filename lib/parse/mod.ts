import { BitReader } from 'bit-reader'

export
type color_8kb = 0 | 1 | 2 | 3
export
type tile = color_8kb[] & { length: 64 }

export
const tile_length = 128 // one tile is represent by 128 bits
const tile_color_interval = tile_length / 2

export
function parse_8kb(array_buffer: ArrayBuffer): tile[] {
  const byte_length = array_buffer.byteLength
  if (byte_length % 16 !== 0) // one tile = 16 bytes
    throw Error('invalid array_buffer of chr rom: one tile = 16 bytes')

  const br = new BitReader(array_buffer)

  const tiles: tile[] = []
  const tiles_sum = byte_length / 16

  let tile_index = 0
  while(tile_index < tiles_sum) {
    const tile: color_8kb[] = []
    const start_index = tile_index * tile_length
    const end_index = start_index + tile_color_interval
    for (let bit_index=start_index; bit_index<end_index; bit_index++) {
      let left_bit = br.read_bit(bit_index)
      let right_bit = br.read_bit(bit_index + tile_color_interval)
      tile.push(left_bit * 2 + right_bit as color_8kb)
    }
    tile_index++
    tiles.push(tile as tile)
  }

  return tiles
}

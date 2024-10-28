import { tile_length } from './common'
import type { tile, color_8kb } from './common'
import { BitReader, divide } from '@8kb/bit.io'


const tile_color_interval = tile_length / 2

export
function parse_tile(array_buffer: ArrayBuffer): tile[] {
  const byte_length = array_buffer.byteLength
  if (byte_length % 16 !== 0) // one tile = 16 bytes
    throw Error('invalid array_buffer of chr rom: one tile = 16 bytes')

  const br = new BitReader(array_buffer)

  const tiles: tile[] = []
  const tiles_sum = byte_length / 16

  let tile_index = 0
  while(tile_index < tiles_sum) {
    const tile: color_8kb[][] = [[], [], [], [], [], [], [], []]
    const start_index = tile_index * tile_length
    const end_index = start_index + tile_color_interval
    for (let bit_index=start_index; bit_index<end_index; bit_index++) {
      let left_bit = br.read_bit(bit_index)
      let right_bit = br.read_bit(bit_index + tile_color_interval)
      const [quotient, remainder] = divide(bit_index - start_index, 8)
      tile[quotient][remainder] = left_bit * 2 + right_bit as color_8kb
    }
    tile_index++
    tiles.push(tile as tile)
  }

  return tiles
}

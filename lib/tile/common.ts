/**
 * A tile has 8x8 pixels.
 */
export
const tile_size = 8

/**
 * + One color is represented by 2 bits.
 * + One tile is composed by tile_size**2 bits.
 * + 2 * 8\*\*2 = 128
 */
export
const tile_length = 2 * tile_size * tile_size

export
type color_8kb = 0 | 1 | 2 | 3
export
type tile_row = color_8kb[] & { length: 8 }
export
type tile = tile_row[] & { length: 8 }

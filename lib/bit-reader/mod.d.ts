type bit_value = 1 | 0

export
function divide(divident: number, divisor: number): [number, number]

export
class BitReader {
  public readonly uint8_array: Uint8Array
  public readonly bit_length: number
  constructor(private array_buffer: ArrayBuffer)

  get_byte(byte_index: number): number
  
  read_bit(index: number): bit_value
  read_bits(): bit_value[]
}

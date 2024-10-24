// @ts-check

export
function divide(divident, divisor) {
  const remainder = divident % divisor
  return [
    (divident - remainder) / divisor,
    remainder,
  ]
}

export
class BitReader {
  constructor(array_buffer) {
    this.array_buffer = array_buffer
    this.uint8_array = new Uint8Array(array_buffer)
    this.bit_length = this.array_buffer.byteLength * 8
  }

  get_byte(index) {
    if (index >= this.array_buffer.byteLength)
      throw Error('byte_index is out of range')
    return this.uint8_array[index]
  }

  read_bit(index) {
    if (index >= this.bit_length)
      throw Error('bit_index is out of range')

    const [byte_index, bit_index] = divide(index, 8)
    const byte = this.get_byte(byte_index)

    let result = byte << bit_index
    result &= 255
    return result >> 7
  }

  read_bits() {
    const result = []
    for (let i=0; i<this.bit_length; i++)
      result.push(this.read_bit(i))
    return result
  }
}

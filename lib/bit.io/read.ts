export
const divide = (divident: number, divisor: number) => {
  const remainder = divident % divisor
  return [
    (divident - remainder) / divisor,
    remainder,
  ]
}

export
type I_bit = 1 | 0

export
const read_bit_by_index_from_u8 = (index: number, u8: Uint8Array, bit_length = u8.length * 8) => {
  if (index < 0 || index >= bit_length)
    return 'out of range'
  if (!Number.isInteger(index))
    return 'invalid index'

  const [byte_index, bit_index] = divide(index, 8)
  const byte = u8[byte_index]

  let result = byte << bit_index
  result &= 255
  return result >> 7 as 1 | 0
}

export
const read_bit = (ab: ArrayBuffer) => {
  const ua = new Uint8Array(ab)
  const bit_length = ab.byteLength * 8
  return (index: number): I_bit | 'out of range' | 'invalid index' =>
    read_bit_by_index_from_u8(index, ua, bit_length)
}

export
const read_bits = (ab: ArrayBuffer) => {
  const bit_length = ab.byteLength * 8
  const read_bit_by_index = read_bit(ab)
  const result: I_bit[] = []
  for (let i=0; i<bit_length; i++)
    result.push(read_bit_by_index(i) as I_bit)
  return result
}

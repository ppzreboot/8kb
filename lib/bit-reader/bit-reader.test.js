// @ts-check

import assert from 'node:assert'
import { describe, it } from 'node:test'
import { BitReader } from './mod.js'

describe('class BitReader', () => {
  const array_buffer = new ArrayBuffer(2) // 2 bytes
  const bit_reader = new BitReader(array_buffer)
  bit_reader.uint8_array.set([4], 1) // 4 = 0b00000100

  it('bit_length', () => {
    assert.strictEqual(bit_reader.bit_length, 16)
  })

  it('get_byte()', () => {
    assert.strictEqual(bit_reader.get_byte(1), 4)
  })
  it('get_byte() out of range', () => {
    assert.throws(
      () => {
        bit_reader.get_byte(2)
      },
      {
        name: 'Error',
        message: 'byte_index is out of range',
      },
    )
  })

  it('read_bit() out of range', () => {
    assert.strictEqual(bit_reader.read_bit(13), 1)
    assert.strictEqual(bit_reader.read_bit(15), 0)
  })
  it('read_bit() out of range', () => {
    assert.throws(
      () => {
        bit_reader.read_bit(16)
      },
      {
        name: 'Error',
        message: 'bit_index is out of range',
      },
    )
  })

  it('read_bits()', () => {
    assert.deepStrictEqual(bit_reader.read_bits(),
      [
        0,0,0,0,
        0,0,0,0,
        0,0,0,0,
        0,1,0,0,
      ]
    )
  })
})

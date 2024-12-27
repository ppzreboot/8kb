// @ts-check

import assert from 'node:assert'
import { describe, it } from 'node:test'
import { read_bit, read_bits } from './mod.js'

const array_buffer = new ArrayBuffer(2) // 2 bytes
const uint8_array = new Uint8Array(array_buffer)
uint8_array.set([4], 1) // 4 = 0b00000100

describe('read_bit()', () => {
  const read_bit_by_index = read_bit(array_buffer)

  it('read_bit_by_index() basic', () => {
    assert.strictEqual(read_bit_by_index(13), 1)
    assert.strictEqual(read_bit_by_index(15), 0)
  })
  it('read_bit_by_index() error: out of range', () => {
    assert.strictEqual(read_bit_by_index(16), 'out of range')
    assert.strictEqual(read_bit_by_index(-1), 'out of range')
  })
  it('read_bit_by_index() error: invalid index', () => {
    assert.strictEqual(read_bit_by_index(0.1), 'invalid index')
  })
})

describe('read_bits()', () => {
  assert.deepStrictEqual(read_bits(array_buffer),
    [
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,1,0,0,
    ]
  )
})

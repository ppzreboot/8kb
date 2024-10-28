import assert from 'node:assert'
import { describe, it } from 'node:test'
import { divide } from './mod.js'

describe('function divide()', () => {
  it('should work', () => {
    assert.deepStrictEqual(divide(10, 3), [3, 1])
  })

  it('negative divident', () => {
    assert.deepStrictEqual(divide(-10, 3), [-3, -1])
  })

  it('negative divisor', () => {
    assert.deepStrictEqual(divide(10, -3), [-3, 1])
  })

  it('no remainder', () => {
    assert.deepStrictEqual(divide(10, 2), [5, 0])
  })
})

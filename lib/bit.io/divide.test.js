import assert from 'node:assert'
import { describe, it } from 'node:test'
import { divide } from './read.js'

describe('divide()', () => {
  it('basic', () => {
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

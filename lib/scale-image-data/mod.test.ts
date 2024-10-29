import { assertEquals } from 'jsr:@std/assert'
import { scale_img_data } from './mod.ts'

const img_data = new ImageData(
  new Uint8ClampedArray([
    0,1,2,3, 4,5,6,7, 8,9,10,11,
    12,13,14,15, 16,17,18,19, 20,21,22,23,
  ]),
  3,
  2,
)

Deno.test('x1', () => {
  const img = scale_img_data(img_data, 1)
  assertEquals(img.width, 3)
  assertEquals(img.height, 2)
  assertEquals(
    Array.from(img.data),
    [
      0,1,2,3, 4,5,6,7, 8,9,10,11,
      12,13,14,15, 16,17,18,19, 20,21,22,23,
    ],
  )
})

Deno.test('x2', () => {
  const img = scale_img_data(img_data, 2)
  assertEquals(img.width, 6)
  assertEquals(img.height, 4)
  assertEquals(
    Array.from(img.data),
    [
      0,1,2,3, 0,1,2,3, 4,5,6,7, 4,5,6,7, 8,9,10,11, 8,9,10,11,
      0,1,2,3, 0,1,2,3, 4,5,6,7, 4,5,6,7, 8,9,10,11, 8,9,10,11,
      12,13,14,15, 12,13,14,15, 16,17,18,19, 16,17,18,19, 20,21,22,23, 20,21,22,23,
      12,13,14,15, 12,13,14,15, 16,17,18,19, 16,17,18,19, 20,21,22,23, 20,21,22,23,
    ],
  )
})
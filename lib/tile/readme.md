# @8kb/tile

## Tilemap
+ 1 pixel = 2 bits (4 colors) (left bit & right bit)
+ 1 tile row = 8 pixels = 2 bytes
+ 1 tile = 8x8 pixels = 16 bytes = 128 bits
+ 512 tiles = 16 \* 512 bytes = (2\*\*4) \* (2\*\*9) bytes = 2**13 bytes = 8 * 1024 bytes

##### One tile in chr rom
> chr: CHaracteR

one color = bits[i] + bits[i + 64]

+ lb: left bit
+ rb: right bit

```
[
  lb, lb, lb, lb, lb, lb, lb, lb, // 8 bit/row
  lb, lb, lb, lb, lb, lb, lb, lb,
  lb, lb, lb, lb, lb, lb, lb, lb,
  lb, lb, lb, lb, lb, lb, lb, lb,
  lb, lb, lb, lb, lb, lb, lb, lb,
  lb, lb, lb, lb, lb, lb, lb, lb,
  lb, lb, lb, lb, lb, lb, lb, lb,
  lb, lb, lb, lb, lb, lb, lb, lb, // 8 rows

  rb, rb, rb, rb, rb, rb, rb, rb,
  rb, rb, rb, rb, rb, rb, rb, rb,
  rb, rb, rb, rb, rb, rb, rb, rb,
  rb, rb, rb, rb, rb, rb, rb, rb,
  rb, rb, rb, rb, rb, rb, rb, rb,
  rb, rb, rb, rb, rb, rb, rb, rb,
  rb, rb, rb, rb, rb, rb, rb, rb,
  rb, rb, rb, rb, rb, rb, rb, rb,
]
```

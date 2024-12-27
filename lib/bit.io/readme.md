# bit.io
`bit.io` is a js/ts library for reading individual bits from an `ArrayBuffer`.

## Install

```bash
npm install @8kb/bit.io
```

## Usage

### read bit
``` ts
import { read_bit } from '@8kb/bit.io'

const array_buffer = new ArrayBuffer(2)
new Uint8Array(array_buffer).set([4], 1) // 4 = 0b00000100

const read_bit_by_index = read_bit(array_buffer)
console.log(read_bit_by_index(13)) // 1
console.log(read_bit_by_index(15)) // 0
console.log(read_bit_by_index(-1)) // 'out of range'
console.log(read_bit_by_index(0.1)) // 'invalid index'
```

### read bits
``` ts
import { read_bits } from '@8kb/bit.io'

const array_buffer = new ArrayBuffer(2)
new Uint8Array(array_buffer).set([4], 1) // 4 = 0b00000100

console.log(read_bits(array_buffer))
// [
//   0,0,0,0,
//   0,0,0,0,
//   0,0,0,0,
//   0,1,0,0,
// ]
```

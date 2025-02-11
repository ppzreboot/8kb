export
function validate_nes(nes: Uint8Array) {
  // Check if the first 4 bytes are 'NES\x1a'
  if (nes[0] !== 0x4e || nes[1] !== 0x45 || nes[2] !== 0x53 || nes[3] !== 0x1a)
    return 'invalid header'

  const prg_size = nes[4] * 0x4000
  const chr_size = nes[5] * 0x2000
  const rom_size = 16 + prg_size + chr_size

  // Check if the size is correct
  if (nes.length !== rom_size)
    return 'invalid size'

  return null
}

/**
 * Extracts CHR from a NES ROM file.
 * @returns The CHR ROM data.
 */
export
function extract_chr(nes: Uint8Array) {
  const prg = nes[4] * 0x4000 // program: 16KB pages
  const chr = nes[5] * 0x2000 // charactor: 8KB pages
  return nes.slice(16 + prg, 16 + prg + chr)
}

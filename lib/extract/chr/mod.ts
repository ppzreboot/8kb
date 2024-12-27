/**
 * Validates a NES ROM file.
 *
 * @param nes - The NES ROM file as a Uint8Array.
 * @returns A string indicating the validation error, or `false` if the ROM is valid.
 *
 * The function performs the following checks:
 * 1. Verifies that the first 4 bytes of the file match the NES file signature 'NES\x1a'.
 * 2. Checks if the size of the file matches the expected size based on the PRG ROM and CHR ROM sizes specified in the header.
 */
export
const validate_nes = (nes: Uint8Array) => {
  // Check if the first 4 bytes are 'NES\x1a'
  if (nes[0] !== 0x4e || nes[1] !== 0x45 || nes[2] !== 0x53 || nes[3] !== 0x1a)
    return 'invalid header'

  // Check if the size is correct
  const prg_rom_size = nes[4] * 0x4000
  const chr_rom_size = nes[5] * 0x2000
  const rom_size = 16 + prg_rom_size + chr_rom_size
  if (nes.length !== rom_size)
    return 'invalid size'

  return false
}

/**
 * Extracts the CHR ROM data from a NES ROM file.
 *
 * @param nes - The NES ROM file as a Uint8Array.
 * @returns The CHR ROM data as a Uint8Array.
 */
export
const extract_chr = (nes: Uint8Array) => {
  const prg = nes[4] * 0x4000 // 16KB pages
  const chr = nes[5] * 0x2000 // 8KB pages
  return nes.slice(16 + prg, 16 + prg + chr)
}

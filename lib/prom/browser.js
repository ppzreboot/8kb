import { validate_nes, extract_chr } from './prom';
export const extract_chr_from_nes = async (nes) => {
    const nes_array = new Uint8Array(await nes.arrayBuffer());
    const invalid = validate_nes(nes_array);
    if (invalid)
        return invalid;
    const chr = extract_chr(nes_array);
    return new Blob([chr], { type: 'application/octet-stream' });
};
export const download_chr = async (nes) => {
    const chr_blob = await extract_chr_from_nes(nes);
    if (typeof chr_blob === 'string')
        throw new Error('invalid nes file');
    const chr_url = URL.createObjectURL(chr_blob);
    const chr_link = document.createElement('a');
    chr_link.href = chr_url;
    chr_link.download = nes.name + '.chr';
    chr_link.click();
};

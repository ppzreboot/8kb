import { create_required_ctx } from 'required-ctx'
import { I_file_meta } from '../../../ss/types'

export
interface I_nes_file extends I_file_meta {
  chr?: Uint8Array
}

export
const nes_file = create_required_ctx<I_nes_file>('nes file')

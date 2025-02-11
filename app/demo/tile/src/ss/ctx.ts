import { create_required_ctx } from 'required-ctx'
import { I_file_meta } from './types'

export
const app_file_meta = create_required_ctx<I_file_meta>('app file')

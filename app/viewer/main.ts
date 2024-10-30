import { register_showcase } from '@8kb/showcase'
import { CHR_viewer } from './app/chr-viewer'

register_showcase()
customElements.define('chr-viewer', CHR_viewer)

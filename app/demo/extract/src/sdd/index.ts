import { I_SDD, SDD } from 'react-sdd'
import { init_nes_page_state } from './page/nes'
import { init_chr_page_state } from './page/chr'

const page = {
  nes: init_nes_page_state(),
  chr: init_chr_page_state(),
}
type I_page = typeof page
export
type I_page_key = keyof I_page
export
const is_page_key = (() => {
  const keys = Object.keys(page)
  return (k: string): k is I_page_key => keys.includes(k)
})()

interface I_current {
  file: File | null
}

export
interface I_app_state {
  current: I_SDD<I_current>
  page: I_page
}

export
const app_state = {
  current: SDD({
    file: null
  }),
  page,
} as I_app_state

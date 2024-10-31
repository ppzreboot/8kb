type listener = () => void

class Listeners_map {
  select_file: listener[] = []
}

type event_type = keyof Listeners_map

export
class Menu extends HTMLElement {
  #file_selected = false
  #listeners_map = new Listeners_map()
  #shadow_root: ShadowRoot

  constructor() {
    super()

    const css = new CSSStyleSheet()
    css.replaceSync(`
      .no-file {
        background: transparent;
        border: none;
        outline: none;
        display: block;
        width: 100vw;
        height: 100vh;
      }
    `)
    const select_btn = document.createElement('button') as HTMLButtonElement
    select_btn.innerHTML = 'Select New File'
    select_btn.classList.add('no-file')
    select_btn.onclick = () => this.emit('select_file')

    const sr = this.attachShadow({ mode: 'closed' })
    sr.adoptedStyleSheets = [css]
    sr.appendChild(select_btn)
    this.#shadow_root = sr
  }

  set_selected() {
    if (this.#file_selected)
      return true
    else {
      this.#file_selected = true
      this.collapse2dialog()
      return false
    }
  }

  collapse2dialog() {
    this.#shadow_root.innerHTML = ''
  }

  emit(event_type: event_type) {
    this.#listeners_map[event_type].forEach(listener => listener())
  }

  listen(event_type: event_type, listener: () => void) {
    const list = this.#listeners_map[event_type]
    list.push(listener)
    return () =>
      list.splice(list.indexOf(listener), 1)
  }
}

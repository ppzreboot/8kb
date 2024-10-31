(() => {
  // ../../lib/scale-image-data/mod.js
  function scale_img_data(img, ratio) {
    if (!Number.isInteger(ratio) || ratio <= 0)
      throw Error("ratio must be a positive integer");
    if (ratio === 1)
      return new ImageData(img.data.slice(), img.width, img.height);
    const w = img.width;
    const sw = img.width * ratio;
    const h = img.height;
    const new_data = Array.from({
      length: w * 4 * ratio * (h * ratio)
    }).map((_, i) => {
      const x = Math.floor(i / 4) % sw;
      const y = Math.floor(i / (sw * 4));
      const z = i % 4;
      const x_from = Math.floor(x / ratio);
      const y_from = Math.floor(y / ratio);
      return img.data[y_from * w * 4 + x_from * 4 + z];
    });
    return new ImageData(new Uint8ClampedArray(new_data), w * ratio, h * ratio);
  }

  // ../../lib/showcase/mod.js
  var Showcase = class extends HTMLElement {
    #canvas;
    #img_data;
    #transform = {
      scale: 4,
      translate: {
        x: 0,
        y: 0
      }
    };
    #rendered = false;
    constructor() {
      super();
      const shadow_root = this.attachShadow({ mode: "closed" });
      const instance = document.createElement("canvas");
      instance.style.display = "block";
      const ctx = instance.getContext("2d");
      this.#canvas = { instance, ctx };
      shadow_root.appendChild(instance);
      this.setup_events();
    }
    /** setup: canvas and events */
    resize_canvas(width, height) {
      const ratio = window.devicePixelRatio;
      if (ratio !== 1) {
        this.#canvas.instance.width = width;
        this.#canvas.instance.height = height;
        this.#canvas.instance.style.width = width / ratio + "px";
        this.#canvas.instance.style.height = height / ratio + "px";
      }
    }
    /** setup/update img */
    set_img_data(img_data) {
      this.#img_data = img_data;
      this.render();
    }
    transform(make) {
      const new_val = make(this.#transform);
      if (new_val.scale < 1) {
        console.warn("scale must be get 1");
        new_val.scale = 1;
      }
      this.#transform = new_val;
      this.render();
    }
    /** cleanup old img, and then rerender with scale */
    render() {
      if (!this.#img_data)
        throw Error("setup canvas and img_data first");
      const canvas = this.#canvas.instance;
      const canvas_ctx = this.#canvas.ctx;
      if (this.#rendered)
        canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);
      else
        this.#rendered = true;
      const cloned = scale_img_data(this.#img_data, this.#transform.scale);
      const calc_start = (container, content, translate) => Math.floor((content >= container ? 0 : (container - content) / 2) + translate);
      canvas_ctx.putImageData(cloned, calc_start(canvas.width, cloned.width, this.#transform.translate.x), calc_start(canvas.height, cloned.height, this.#transform.translate.y));
    }
    setup_events() {
      const canvas = this.#canvas.instance;
      const listen = (event_name, cb) => {
        canvas.addEventListener(event_name, (event) => {
          if (this.#rendered)
            cb(event);
        });
      };
      let dragging = false;
      listen("mousedown", () => dragging = true);
      listen("mouseup", () => dragging = false);
      listen("mouseleave", () => dragging = false);
      listen("mouseout", () => dragging = false);
      listen("mousemove", (evt) => {
        if (dragging) {
          this.#transform.translate.x += evt.movementX * (devicePixelRatio || 1);
          this.#transform.translate.y += evt.movementY * (devicePixelRatio || 1);
          this.render();
        }
      });
      canvas.addEventListener("wheel", (evt) => {
        if (!this.#rendered)
          return;
        evt.preventDefault();
        if (evt.deltaY === 0)
          return;
        else if (evt.deltaY > 0)
          this.#transform.scale++;
        else {
          this.#transform.scale--;
          if (this.#transform.scale < 1)
            this.#transform.scale = 1;
        }
        this.render();
      });
    }
  };

  // app/mods/showcase.ts
  var Showcase2 = class extends Showcase {
    constructor() {
      super();
      this.resize_canvas(
        document.body.clientWidth * (devicePixelRatio || 1),
        document.body.clientHeight * (devicePixelRatio || 1)
      );
    }
  };

  // ../../lib/tile/common.ts
  var tile_size = 8;
  var tile_length = 2 * tile_size * tile_size;

  // ../../lib/bit.io/read.js
  function divide(divident, divisor) {
    const remainder = divident % divisor;
    return [
      (divident - remainder) / divisor,
      remainder
    ];
  }
  var BitReader = class {
    array_buffer;
    uint8_array;
    bit_length;
    constructor(array_buffer) {
      this.array_buffer = array_buffer;
      this.uint8_array = new Uint8Array(array_buffer);
      this.bit_length = this.array_buffer.byteLength * 8;
    }
    get_byte(index) {
      if (index >= this.array_buffer.byteLength)
        throw Error("byte_index is out of range");
      return this.uint8_array[index];
    }
    read_bit(index) {
      if (index >= this.bit_length)
        throw Error("bit_index is out of range");
      const [byte_index, bit_index] = divide(index, 8);
      const byte = this.get_byte(byte_index);
      let result = byte << bit_index;
      result &= 255;
      return result >> 7;
    }
    read_bits() {
      const result = [];
      for (let i = 0; i < this.bit_length; i++)
        result.push(this.read_bit(i));
      return result;
    }
  };

  // ../../lib/tile/parse.ts
  var tile_color_interval = tile_length / 2;
  function parse_tile(array_buffer) {
    const byte_length = array_buffer.byteLength;
    if (byte_length % 16 !== 0)
      throw Error("invalid array_buffer of chr rom: one tile = 16 bytes");
    const br = new BitReader(array_buffer);
    const tiles = [];
    const tiles_sum = byte_length / 16;
    let tile_index = 0;
    while (tile_index < tiles_sum) {
      const tile = [[], [], [], [], [], [], [], []];
      const start_index = tile_index * tile_length;
      const end_index = start_index + tile_color_interval;
      for (let bit_index = start_index; bit_index < end_index; bit_index++) {
        let left_bit = br.read_bit(bit_index);
        let right_bit = br.read_bit(bit_index + tile_color_interval);
        const [quotient, remainder] = divide(bit_index - start_index, 8);
        tile[quotient][remainder] = left_bit * 2 + right_bit;
      }
      tile_index++;
      tiles.push(tile);
    }
    return tiles;
  }

  // ../../lib/tile/render.ts
  function tile2img_data(opts) {
    const canvas = new OffscreenCanvas(opts.width, opts.height);
    const ctx = canvas.getContext("2d");
    for (const tile of opts.tiles) {
      const pixels = tile.data.map((tile_row) => [
        tile_row
      ]).flat().flat().map((color_8kb) => tile.color_map[color_8kb]);
      const data = new Uint8ClampedArray(pixels.flat());
      const image_data = new ImageData(data, 8, 8);
      ctx.putImageData(image_data, tile.x, tile.y);
    }
    return ctx.getImageData(0, 0, opts.width, opts.height);
  }

  // app/mods/file2img.ts
  async function file2img(file, color_map2) {
    const tiles = parse_tile(await file.arrayBuffer());
    const row_length = 16;
    return tile2img_data({
      width: 8 * row_length,
      height: tiles.length / row_length * 8,
      tiles: tiles.map((data, i) => {
        const [quotient, remainder] = divide(i, row_length);
        return {
          data,
          x: remainder * 8,
          y: quotient * 8,
          color_map: color_map2
        };
      })
    });
  }

  // app/mods/palette/index.ts
  var Palette = class extends HTMLElement {
    #value;
    #values = [
      {
        // Mario
        0: [0, 0, 0, 0],
        1: [237, 159, 35, 255],
        2: [182, 48, 32, 255],
        3: [107, 109, 0, 255]
      }
    ];
    constructor() {
      super();
      this.#value = this.#values[0];
    }
    get_value() {
      return this.#value;
    }
  };

  // app/mods/menu/index.ts
  var Listeners_map = class {
    select_file = [];
  };
  var Menu = class extends HTMLElement {
    #file_selected = false;
    #listeners_map = new Listeners_map();
    #shadow_root;
    constructor() {
      super();
      const css = new CSSStyleSheet();
      css.replaceSync(`
      .no-file {
        background: transparent;
        border: none;
        outline: none;
        display: block;
        width: 100vw;
        height: 100vh;
      }
    `);
      const select_btn = document.createElement("button");
      select_btn.innerHTML = "Select New File";
      select_btn.classList.add("no-file");
      select_btn.onclick = () => this.emit("select_file");
      const sr = this.attachShadow({ mode: "closed" });
      sr.adoptedStyleSheets = [css];
      sr.appendChild(select_btn);
      this.#shadow_root = sr;
    }
    set_selected() {
      if (this.#file_selected)
        return true;
      else {
        this.#file_selected = true;
        this.collapse2dialog();
        return false;
      }
    }
    collapse2dialog() {
      this.#shadow_root.innerHTML = "";
    }
    emit(event_type) {
      this.#listeners_map[event_type].forEach((listener) => listener());
    }
    listen(event_type, listener) {
      const list = this.#listeners_map[event_type];
      list.push(listener);
      return () => list.splice(list.indexOf(listener), 1);
    }
  };

  // app/chr-viewer.ts
  customElements.define("ppz-showcase", Showcase2);
  customElements.define("ppz-palette", Palette);
  customElements.define("ppz-menu", Menu);
  var CHR_viewer = class extends HTMLElement {
    constructor() {
      super();
      const showcase = document.createElement("ppz-showcase");
      const palette = document.createElement("ppz-palette");
      const menu = document.createElement("ppz-menu");
      const file_input = document.createElement("input");
      file_input.type = "file";
      file_input.onchange = async () => {
        const file = file_input.files?.[0];
        if (file) {
          if (!menu.set_selected())
            sr.appendChild(showcase);
          showcase.set_img_data(
            await file2img(file, palette.get_value())
          );
        }
      };
      menu.listen("select_file", () => file_input.click());
      const sr = this.attachShadow({ mode: "closed" });
      sr.appendChild(palette);
      sr.appendChild(menu);
    }
  };

  // main.ts
  customElements.define("chr-viewer", CHR_viewer);
})();

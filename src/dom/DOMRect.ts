const SET_RECT = Symbol();

export interface IDOMRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export default class DOMRect {
  #x = 0;
  #y = 0;
  #width = 0;
  #height = 0;
  #top = 0;
  #right = 0;
  #bottom = 0;
  #left = 0;

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get top() {
    return this.#top;
  }

  get right() {
    return this.#right;
  }

  get bottom() {
    return this.#bottom;
  }

  get left() {
    return this.#left;
  }

  [SET_RECT](rect: IDOMRect) {
    this.#x = rect.x;
    this.#y = rect.y;
    this.#width = rect.width;
    this.#height = rect.height;
    this.#top = rect.top;
    this.#left = rect.left;
    this.#right = rect.right;
    this.#bottom = rect.bottom;
  }

  static fromRect(rect: IDOMRect) {
    const r = new DOMRect();
    r[SET_RECT](rect);
    return r;
  }
}

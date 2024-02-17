import WebGPUCanvasContext from "./WebGPUCanvasContext.ts";
import DOMRect from "./dom/DOMRect.ts";
import SDL2Backend from "./sdl2/SDL2Backend.ts";

export default class WebGPUCanvas extends EventTarget {
  #context?: WebGPUCanvasContext;
  #backend: SDL2Backend;
  style = {};

  constructor(parameters?: {
    title?: string;
    width?: number;
    height?: number;
  }) {
    super();
    const params = {
      title: "Window",
      width: 800,
      height: 600,
      ...parameters,
    };
    this.#backend = new SDL2Backend(params.title, params.width, params.height);
  }

  get width() {
    return this.#backend.width;
  }

  set width(v) {
    this.#backend.width = v;
  }

  get height() {
    return this.#backend.height;
  }

  set height(v) {
    this.#backend.height = v;
  }

  get clientWidth() {
    return this.width;
  }

  get clientHeight() {
    return this.height;
  }

  setPointerCapture() {}
  releasePointerCapture() {}

  getRootNode() {
    return this;
  }

  getBoundingClientRect() {
    return DOMRect.fromRect({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      top: 0,
      left: 0,
      right: this.width,
      bottom: this.height,
    });
  }

  getContext(contextId: "webgpu") {
    switch (contextId) {
      case "webgpu": {
        if (!this.#context) {
          const surface = this.#backend.getSurface();
          const context = surface.getContext("webgpu");
          this.#context = new WebGPUCanvasContext(context, this);
          this.#backend.pollEvents(this);
        }
        return this.#context;
      }
      default: {
        return null;
      }
    }
  }
}

import type WebGPUCanvas from "./WebGPUCanvas.ts";

export default class WebGPUCanvasContext {
  #context: GPUCanvasContext;
  #canvas: WebGPUCanvas;

  constructor(context: GPUCanvasContext, canvas: WebGPUCanvas) {
    this.#context = context;
    this.#canvas = canvas;
  }

  get canvas() {
    return this.#canvas;
  }

  configure(configuration: Omit<GPUCanvasConfiguration, "width" | "height">) {
    this.#context.configure({
      ...configuration,
      width: this.#canvas.width,
      height: this.#canvas.height,
      usage: undefined,
    });
  }

  unconfigure() {
    this.#context.unconfigure();
  }

  getCurrentTexture() {
    return this.#context.getCurrentTexture();
  }
}

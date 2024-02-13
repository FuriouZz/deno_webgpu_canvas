import WebGPUContext from "./WebGPUContext.ts";
import SDL2Canvas from "./sdl2/SDL2Canvas.ts";

export default class WebGPUCanvas extends SDL2Canvas {
  #surface?: Deno.UnsafeWindowSurface;
  #context?: WebGPUContext;

  getContext(contextId: "webgpu") {
    switch (contextId) {
      case "webgpu": {
        if (!this.#context) {
          this.#surface = this.window.windowSurface();
          const context = this.#surface.getContext("webgpu");
          this.#context = new WebGPUContext(context, this);
          this.pollEvents(this.#surface);
        }
        return this.#context;
      }
      default: {
        return null;
      }
    }
  }
}

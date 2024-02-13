import { EventType, Window, WindowBuilder } from "../../deps/sdl2.ts";
import DOMRect from "../dom/DOMRect.ts";
import KeyboardEvent from "../dom/events/KeyboardEvent.ts";
import PointerEvent from "../dom/events/PointerEvent.ts";
import WheelEvent from "../dom/events/WheelEvent.ts";
import { SDL2Keyboard } from "./SDL2Keyboard.ts";
import { Code } from "./keymap.ts";
import { KeyMap } from "./keymap.ts";

export default class SDL2Canvas extends EventTarget {
  #window: Window;
  #size: { width: number; height: number };
  style = {};

  constructor(title: string, width: number, height: number) {
    super();
    const window = new WindowBuilder(title, width, height).build();
    this.#size = { width, height };
    this.#window = window;
  }

  get window() {
    return this.#window;
  }

  get width() {
    return this.#size.width;
  }

  set width(v) {
    this.#size.width = v;
  }

  get height() {
    return this.#size.height;
  }

  set height(v) {
    this.#size.height = v;
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

  async pollEvents(surface: Deno.UnsafeWindowSurface) {
    const kb = new SDL2Keyboard();

    for await (const event of this.#window.events()) {
      if (event.type === EventType.Quit) {
        break;
      }

      switch (event.type) {
        case EventType.Draw: {
          this.dispatchEvent(new CustomEvent("draw"));
          surface?.present();
          break;
        }

        case EventType.MouseWheel: {
          const e = new WheelEvent("wheel");

          e.metaKey = kb.metaKey;
          e.ctrlKey = kb.ctrlKey;
          e.altKey = kb.altKey;
          e.shiftKey = kb.shiftKey;
          e.which = event.which;
          e.button = event.button;
          e.clientX = kb.mouseX;
          e.clientY = kb.mouseY;
          e.x = kb.mouseX;
          e.y = kb.mouseY;
          e.deltaX = event.x;
          e.deltaY = event.y;

          this.dispatchEvent(e);

          break;
        }

        case EventType.MouseButtonDown:
        case EventType.MouseButtonUp:
        case EventType.MouseMotion: {
          kb.onmouse(event);

          let eventName =
            event.type === EventType.MouseButtonUp
              ? "pointerup"
              : event.type === EventType.MouseButtonDown
              ? "pointerdown"
              : "pointermove";

          if (
            event.x > this.width ||
            event.x < 0 ||
            event.y > this.height ||
            event.y < 0
          ) {
            eventName = "pointercancel";
          }

          const e = new PointerEvent(eventName);

          const x = Math.max(0, Math.min(event.x, this.width));
          const y = Math.max(0, Math.min(event.y, this.width));

          e.metaKey = kb.metaKey;
          e.ctrlKey = kb.ctrlKey;
          e.altKey = kb.altKey;
          e.shiftKey = kb.shiftKey;
          e.which = event.which;
          e.button = event.button - 1;
          e.clientX = x;
          e.clientY = y;
          e.x = x;
          e.y = y;

          this.dispatchEvent(e);

          break;
        }

        case EventType.KeyDown:
        case EventType.KeyUp: {
          kb.onkey(event);

          const e = new KeyboardEvent(
            event.type === EventType.KeyUp ? "keyup" : "keydown"
          );
          e.metaKey = kb.metaKey;
          e.ctrlKey = kb.ctrlKey;
          e.altKey = kb.altKey;
          e.shiftKey = kb.shiftKey;
          e.keyCode = KeyMap[event.keysym.scancode];
          e.which = e.keyCode;
          e.code = Code[e.keyCode];

          this.dispatchEvent(e);

          break;
        }
      }
    }
  }
}

import { EventType, Window, WindowBuilder } from "../../deps/sdl2.ts";
import KeyboardEvent from "../dom/events/KeyboardEvent.ts";
import PointerEvent from "../dom/events/PointerEvent.ts";
import WheelEvent from "../dom/events/WheelEvent.ts";
import { SDL2Keyboard } from "./SDL2Keyboard.ts";
import { Code } from "./keymap.ts";
import { KeyMap } from "./keymap.ts";

export default class SDL2Backend {
  #window: Window;
  #size: { width: number; height: number };
  #surface?: Deno.UnsafeWindowSurface;

  constructor(title: string, width: number, height: number) {
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

  getSurface() {
    if (!this.#surface) {
      this.#surface = this.#window.windowSurface()
    }
    return this.#surface
  }

  async pollEvents(eventTarget: EventTarget) {
    const kb = new SDL2Keyboard();

    for await (const event of this.#window.events()) {
      if (event.type === EventType.Quit) {
        break;
      }

      switch (event.type) {
        case EventType.Draw: {
          eventTarget.dispatchEvent(new CustomEvent("draw"));
          this.#surface?.present();
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

          eventTarget.dispatchEvent(e);

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

          eventTarget.dispatchEvent(e);

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

          eventTarget.dispatchEvent(e);

          break;
        }
      }
    }
  }
}

import { EventType } from "../../deps/sdl2.ts";
import { KeyMap, Code } from "./keymap.ts";
import { SDL2MouseEvent } from "./types.ts";
import { SDL2KeyboardEvent } from "./types.ts";

export class SDL2Keyboard {
  altKey = false;
  ctrlKey = false;
  shiftKey = false;
  metaKey = false;

  mouseX = 0;
  mouseY = 0;

  onmouse(event: SDL2MouseEvent) {
    this.mouseX = event.x;
    this.mouseY = event.y;
  }

  onkey(event: SDL2KeyboardEvent) {
    const pressed = event.type === EventType.KeyDown;
    const code = KeyMap[event.keysym.scancode];
    const keyCode = Code[code];
    if (keyCode === "ShiftLeft" || keyCode === "ShiftRight") {
      this.shiftKey = pressed;
    } else if (keyCode === "ControlLeft" || keyCode === "ControlRight") {
      this.ctrlKey = pressed;
    } else if (keyCode === "AltLeft" || keyCode === "AltRight") {
      this.altKey = pressed;
    } else if (keyCode === "MetaLeft" || keyCode === "MetaRight") {
      this.metaKey = pressed;
    }
  }
}

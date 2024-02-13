import { EventType } from "../../deps/sdl2.ts";

export interface SDL2KeyboardEvent {
  type: EventType.KeyUp | EventType.KeyDown;
  timestamp: number;
  windowID: number;
  state: 0 | 1;
  repeat: number;
  padding2: number;
  padding3: number;
  keysym: { scancode: number; sym: number; mod: 0 | 1; unicode: number };
}

export interface SDL2MouseEvent {
  type: EventType.MouseButtonDown | EventType.MouseButtonUp;
  timestamp: number;
  windowID: number;
  which: number;
  button: number;
  state: 0 | 1;
  padding1: number;
  padding2: number;
  x: number;
  y: number;
}

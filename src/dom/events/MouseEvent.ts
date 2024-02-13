import UIEvent from "./UIEvent.ts";

export default class MouseEvent extends UIEvent {
  altKey = false;
  ctrlKey = false;
  metaKey = false;
  shiftKey = false;
  clientX = 0;
  clientY = 0;
  x = 0;
  y = 0;
  button = 0;
}

import UIEvent from "./UIEvent.ts";

export default class KeyboardEvent extends UIEvent {
  altKey = false;
  ctrlKey = false;
  metaKey = false;
  shiftKey = false;
  repeat = false;
  key = "";
  code = "";
  keyCode = -1;
}

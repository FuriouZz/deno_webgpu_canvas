import MouseEvent from "./MouseEvent.ts";

export default class PointerEvent extends MouseEvent {
  pointerType: "mouse" | "pen" | "touch" = "mouse";
}

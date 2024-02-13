import MouseEvent from "./MouseEvent.ts";

export default class WheelEvent extends MouseEvent {
  deltaX = 0;
  deltaY = 0;
  deltaZ = 0;
  deltaMode:
    | typeof WheelEvent.DOM_DELTA_PIXEL
    | typeof WheelEvent.DOM_DELTA_PAGE
    | typeof WheelEvent.DOM_DELTA_LINE;

  constructor(type: string, eventInitDict?: EventInit | undefined) {
    super(type, eventInitDict);
    this.deltaMode = WheelEvent.DOM_DELTA_PIXEL;
  }

  static DOM_DELTA_PIXEL = 0x00;
  static DOM_DELTA_LINE = 0x01;
  static DOM_DELTA_PAGE = 0x02;
}

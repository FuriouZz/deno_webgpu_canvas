import { MacCodes } from "./MacCodes.ts";
import { WindowsCodes } from "./WindowsCodes.ts";
import { LinuxCodes } from "./LinuxCodes.ts";

export function getCodes():
  | typeof MacCodes
  | typeof WindowsCodes
  | typeof LinuxCodes
  | undefined {
  if (Deno.build.os === "darwin") {
    return MacCodes;
  }
  if (Deno.build.os === "windows") {
    return WindowsCodes;
  }
  if (Deno.build.os === "linux") {
    return LinuxCodes;
  }
}

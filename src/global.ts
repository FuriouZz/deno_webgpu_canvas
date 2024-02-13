// deno-lint-ignore ban-ts-comment
// @ts-ignore
globalThis.requestAnimationFrame = () => {
  console.warn("requestAnimationFrame is not supported");
};

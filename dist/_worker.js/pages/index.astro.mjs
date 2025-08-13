globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, b as createAstro, f as renderHead, e as renderScript, r as renderTemplate } from '../chunks/astro/server_CDii1nDs.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Learn English - Trinav</title>${renderHead()}</head> <body> <div id="root"></div> ${renderScript($$result, "C:/Users/trust/Downloads/8tl09pl09pl09l9/TERM2-main/src/pages/index.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/Users/trust/Downloads/8tl09pl09pl09l9/TERM2-main/src/pages/index.astro", void 0);

const $$file = "C:/Users/trust/Downloads/8tl09pl09pl09l9/TERM2-main/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

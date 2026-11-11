import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const source = ts.transpileModule(
  readFileSync(new URL("../src/components/AsciiCanvas.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
).outputText;

function eventTarget() {
  const listeners = new Map();
  return {
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(callback);
    },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
    emit(name, event = {}) { for (const callback of listeners.get(name) ?? []) callback(event); },
    count(name) { return listeners.get(name)?.size ?? 0; },
  };
}

// Run the real component/effects with deterministic browser scheduling. Canvas
// pixels are white because these tests exercise invalidation, not scene artwork.
function mount(props = {}, reducedMotion = false) {
  const slots = [], effects = [], frames = new Map(), intersections = [], resizes = [];
  const times = [];
  let cursor = 0, nextFrame = 0, clock = 100, paints = 0, glyphs = 0, resolveFonts;
  const media = Object.assign(eventTarget(), { matches: reducedMotion });
  const fonts = Object.assign(eventTarget(), { ready: new Promise(resolve => { resolveFonts = resolve; }) });
  const document = Object.assign(eventTarget(), { hidden: false, body: {}, documentElement: eventTarget(), fonts });
  const window = eventTarget();
  const context = {
    setTransform() {}, clearRect() { paints++; glyphs = 0; }, fillRect() {}, fillText() { glyphs++; },
    getImageData(_x, _y, width, height) { return { data: new Uint8ClampedArray(width * height * 4).fill(255) }; },
  };
  const canvas = {
    clientWidth: 100, clientHeight: 100, width: 0, height: 0,
    getContext: () => context,
    getBoundingClientRect: () => ({ left: 0, top: 0 }),
    classList: { add() {} },
  };
  document.createElement = () => ({ width: 0, height: 0, getContext: () => context });
  const react = {
    useRef(value) {
      const index = cursor++;
      return slots[index] ??= { current: value };
    },
    useEffect(callback, deps) {
      const index = cursor++, previous = slots[index];
      if (!previous || deps.some((dep, i) => dep !== previous.deps[i])) effects.push(() => {
        previous?.cleanup?.();
        slots[index] = { deps, cleanup: callback() };
      });
    },
  };
  const sandbox = {
    exports: {}, document, window, devicePixelRatio: 1,
    require(name) {
      if (name === "react") return react;
      if (name === "react/jsx-runtime") return { jsx: (type, elementProps) => ({ type, props: elementProps }) };
      throw new Error(`Unexpected import: ${name}`);
    },
    matchMedia: () => media,
    getComputedStyle: () => ({ getPropertyValue: () => "monospace" }),
    performance: { now: () => clock },
    requestAnimationFrame(callback) { const id = ++nextFrame; frames.set(id, callback); return id; },
    cancelAnimationFrame(id) { frames.delete(id); },
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; intersections.push(this); }
      observe() {} disconnect() { this.disconnected = true; }
    },
    ResizeObserver: class {
      constructor(callback) { this.callback = callback; resizes.push(this); }
      observe() {} disconnect() { this.disconnected = true; }
    },
  };
  runInNewContext(source, sandbox);
  const defaults = { label: "Test scene", layers: (time, width, height) => { times.push({ time, width, height }); return []; } };
  function render(nextProps) {
    cursor = 0;
    const element = sandbox.exports.default({ ...defaults, ...nextProps });
    element.props.ref.current = canvas;
    while (effects.length) effects.shift()();
  }
  function frame(now = clock + 100) {
    clock = now;
    const pending = [...frames.entries()];
    for (const [id, callback] of pending) { frames.delete(id); callback(now); }
  }
  function intersect(visible) { for (const observer of intersections) if (!observer.disconnected) observer.callback([{ isIntersecting: visible }]); }
  function unmount() { for (const slot of slots) slot?.cleanup?.(); }
  render(props);
  intersect(true);
  frame(100);
  return {
    render, frame, intersect, unmount, media, fonts, document, window, canvas, times,
    get paints() { return paints; }, get glyphs() { return glyphs; }, get pendingFrames() { return frames.size; },
    advance(now) { clock = now; },
    preference(reduce) { media.matches = reduce; media.emit("change", { matches: reduce }); },
    resize(width, height) {
      canvas.clientWidth = width; canvas.clientHeight = height;
      for (const observer of resizes) if (!observer.disconnected) observer.callback([{ target: canvas }]);
    },
    resolveFonts() { resolveFonts(fonts); },
  };
}

test("updates animation when the reduced-motion preference changes", () => {
  const scene = mount();
  assert.equal(scene.pendingFrames, 1);
  scene.preference(true);
  scene.frame(200);
  assert.equal(scene.pendingFrames, 0);
  assert.equal(scene.times.at(-1).time, 3);
  scene.preference(false);
  scene.frame(300);
  assert.equal(scene.pendingFrames, 1);
  scene.unmount();
  assert.equal(scene.media.count("change"), 0);
  assert.equal(scene.pendingFrames, 0);
});

test("repaints a static scene when its drawing props change", () => {
  const scene = mount({ animate: false });
  let updatedDraws = 0;
  scene.render({ animate: false, cell: () => 8, layers: () => { updatedDraws++; return []; } });
  scene.frame(200);
  assert.equal(updatedDraws, 1);
  assert.equal(scene.canvas.getContext().font, "500 11.36px monospace");
  assert.equal(scene.pendingFrames, 0);
  scene.unmount();
});

test("uses the current lens setting for pointer interaction after mount", () => {
  const scene = mount({ animate: false, lens: false });
  scene.render({ animate: false, lens: { radius: 40, color: "red" } });
  scene.frame(200);
  const beforePointer = scene.paints;
  scene.window.emit("pointermove", { clientX: 50, clientY: 50 });
  scene.frame(300);
  assert.equal(scene.paints, beforePointer + 1);
  scene.render({ animate: false, lens: false });
  scene.frame(400);
  const disabledPaints = scene.paints;
  scene.window.emit("pointermove", { clientX: 10, clientY: 10 });
  scene.frame(500);
  assert.equal(scene.paints, disabledPaints);
  scene.unmount();
  assert.equal(scene.window.count("pointermove"), 0);
});

test("repaints a static lens when the pointer leaves the document", () => {
  const scene = mount({ animate: false, lens: { radius: 40, color: "red" } });
  scene.window.emit("pointermove", { clientX: 50, clientY: 50 });
  scene.frame(200);
  const beforeLeave = scene.paints;
  assert.ok(scene.glyphs > 0);
  scene.document.documentElement.emit("pointerleave");
  scene.frame(300);
  assert.equal(scene.paints, beforeLeave + 1);
  assert.equal(scene.glyphs, 0);
  assert.equal(scene.pendingFrames, 0);
  scene.unmount();
});

test("redraws static canvases when their container changes size", () => {
  const scene = mount({ animate: false });
  scene.resize(180, 120);
  scene.frame(200);
  assert.equal(scene.canvas.width, 180);
  assert.equal(scene.canvas.height, 120);
  assert.deepEqual(scene.times.at(-1), { time: 3, width: 180, height: 120 });
  scene.unmount();
  const afterUnmount = scene.paints;
  scene.resize(240, 160);
  scene.frame(300);
  assert.equal(scene.paints, afterUnmount);
});

test("redraws static glyphs when fonts finish loading", async () => {
  const scene = mount({ animate: false });
  const beforeFonts = scene.paints;
  scene.resolveFonts();
  await Promise.resolve();
  scene.frame(200);
  assert.equal(scene.paints, beforeFonts + 1);
  scene.fonts.emit("loadingdone");
  scene.frame(300);
  assert.equal(scene.paints, beforeFonts + 2);
  scene.unmount();
  scene.fonts.emit("loadingdone");
  scene.frame(400);
  assert.equal(scene.paints, beforeFonts + 2);

  const removed = mount({ animate: false });
  const removedPaints = removed.paints;
  removed.unmount();
  removed.resolveFonts();
  await Promise.resolve();
  removed.frame(200);
  assert.equal(removed.paints, removedPaints);
  assert.equal(removed.pendingFrames, 0);
});

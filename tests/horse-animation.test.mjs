import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const bytes = await readFile(new URL("../public/horse.glb", import.meta.url));
const gltf = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), "");
const horse = gltf.scene.children[0];
const mixer = new AnimationMixer(horse);
mixer.clipAction(gltf.animations[0]).setDuration(1).play();

function pose(time) {
  mixer.setTime(time);
  return [...horse.morphTargetInfluences];
}

test("gallop interpolates between source poses rather than snapping", () => {
  const a = pose(0.123), b = pose(0.127);
  assert.ok(a.some(weight => weight > 0 && weight < 1), "Expected blended morph weights");
  assert.notDeepEqual(a, b, "Pose must change within a single 60 Hz frame");
  assert.ok([...a, ...b].every(Number.isFinite));
});

test("gallop repeats the same pose after a full cycle", () => {
  const a = pose(0.123), b = pose(1.123);
  a.forEach((weight, i) => assert.ok(Math.abs(weight - b[i]) < 1e-6));
});

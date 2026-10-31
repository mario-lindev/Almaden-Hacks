"use client";

import { useEffect, useState } from "react";
import AsciiCanvas, { type AsciiLayer } from "./AsciiCanvas";

type Plane = { color: string; alpha: number; size: number; ground: number; gait: number; count: number; offset: number };
type HorseScene = { draw: (plane: number, t: number, w: number, h: number) => HTMLCanvasElement; dispose: () => void };

const planes: Plane[] = [
  { color: "#8fa8b9", alpha: 0.65, size: 0.48, ground: 0.44, gait: 0.95, count: 3, offset: 0.2 },
  { color: "#537799", alpha: 0.85, size: 0.72, ground: 0.69, gait: 1.05, count: 2, offset: 0.5 },
  { color: "#244d87", alpha: 1, size: 1.02, ground: 0.96, gait: 1.15, count: 2, offset: 0.1 },
];

export default function Horses() {
  const [horseScene, setHorseScene] = useState<HorseScene | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function load() {
      const [THREE, { GLTFLoader }] = await Promise.all([
        import("three"),
        import("three/addons/loaders/GLTFLoader.js"),
      ]);
      const gltf = await new GLTFLoader().loadAsync("/horse.glb");
      if (cancelled) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(1);
      renderer.setClearColor(0xffffff);
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 3000);
      camera.position.set(0, 0, 1000);
      const material = new THREE.MeshLambertMaterial({ color: 0x555555 });
      const model = gltf.scene.children[0] as import("three").Mesh;
      const scenes = planes.map(plane => {
        const scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0xffffff, 1.1));
        const key = new THREE.DirectionalLight(0xffffff, 2);
        key.position.set(-200, 400, 500);
        scene.add(key);
        const horses = Array.from({ length: plane.count }, () => {
          const mesh = model.clone();
          mesh.material = material;
          mesh.rotation.y = Math.PI / 2 - 0.12;
          scene.add(mesh);
          const mixer = new THREE.AnimationMixer(mesh);
          mixer.clipAction(gltf.animations[0]).setDuration(1).play();
          return { mesh, mixer };
        });
        return { scene, horses };
      });

      const resource: HorseScene = {
        draw(p, t, w, h) {
          const plane = planes[p];
          const { scene, horses } = scenes[p];
          // Render only at the character grid's resolution, not full screen resolution.
          const rw = Math.ceil(w / 3), rh = Math.ceil(h / 4.8);
          if (renderer.domElement.width !== rw || renderer.domElement.height !== rh) {
            renderer.setSize(rw, rh, false);
            camera.left = -w / 2; camera.right = w / 2;
            camera.top = h / 2; camera.bottom = -h / 2;
            camera.updateProjectionMatrix();
          }
          const size = Math.min(h * plane.size, w * 0.85);
          const loop = w + size * 1.5;
          horses.forEach(({ mesh, mixer }, n) => {
            const gait = plane.gait * (1 + n * 0.025);
            const cycle = t * gait + p * 0.29 + n * 0.41;
            mixer.setTime(cycle);
            mesh.scale.setScalar(size / 325);
            const x = ((plane.offset + n / plane.count) * loop + t * size * gait * 0.48) % loop - size;
            mesh.position.set(x - w / 2, h / 2 - h * plane.ground, 0);
          });
          renderer.render(scene, camera);
          return renderer.domElement;
        },
        dispose() {
          scenes.forEach(({ horses }) => horses.forEach(({ mixer }) => { mixer.stopAllAction(); mixer.uncacheRoot(mixer.getRoot()); }));
          model.geometry.dispose();
          const original = Array.isArray(model.material) ? model.material : [model.material];
          original.forEach(m => m.dispose());
          material.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
        },
      };
      cleanup = resource.dispose;
      if (cancelled) resource.dispose(); else setHorseScene(resource);
    }
    void load();
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  if (!horseScene) return <div className="horse-art horse-art-hero" />;

  const layers = (t: number, w: number, h: number): AsciiLayer[] => horseScene ? planes.map((plane, p) => ({
    color: plane.color,
    alpha: plane.alpha,
    draw: s => { s.drawImage(horseScene.draw(p, t, w, h), 0, 0, w, h); },
  })) : [];

  return <div className="horse-art horse-art-hero">
    <AsciiCanvas
      label="Seven horses with continuously animated galloping legs, rendered in blue ASCII"
      layers={layers}
      cell={w => w < 600 ? 3 : 4}
      fps={60}
    />
  </div>;
}

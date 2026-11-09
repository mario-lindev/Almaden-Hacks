# Black-Hole WebGPU Renderer

An optional scene loaded by ../BlackHole.tsx through ../GpuScene.tsx. It is
currently not mounted on the event homepage.

- renderer.ts: Scene initialization, animation, and disposal.
- pipeline.ts: GPU resources and rendering passes.
- settings.ts: Scene and quality configuration.
- noise-volume.mjs: Noise texture generation.
- *.wgsl: Geometry, shading, stars, bloom, refinement, and compositing passes.

The WGSL loader is configured for Turbopack and webpack in the root next.config.ts.
Keep shader imports and the renderer lifecycle intact when changing this scene.

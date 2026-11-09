# UI Components & Artwork

- Nav.tsx and EventActions.tsx: Navigation, registration, and Discord actions.
- Sponsors.tsx: Sponsor cards; content lives in ../lib/sponsors.ts.
- Reveal.tsx: Section entrance effects. Headings use plain server-rendered text.
- AsciiCanvas.tsx and AsciiScenes.tsx: Canvas rendering and ASCII scene artwork.
- Horses.tsx and Mountains.tsx: Homepage landscape animation.
- BlackHole.tsx, GpuScene.tsx, FallbackHole.tsx, and [blackhole](blackhole/README.md):
  Optional WebGPU scene and fallback, currently not mounted on the homepage.
- Clock.tsx: Homepage countdown to the event.
- Ticker.tsx: Optional scrolling-text component, currently not mounted.

Server components are the default; browser effects use explicit client components.

# Asset Generation Scripts

build-horse-motion.py stabilizes and interpolates the eight frames in
public/gallop.jpg into a 64-frame atlas at public/gallop-motion.webp.

Run from the repository root with Python and uv installed:

```sh
uv run --with opencv-python-headless --with pillow scripts/build-horse-motion.py
```

This is an offline asset-generation step and is not part of the production build.
Review the generated animation before committing it.

"""Build an aligned, motion-interpolated loop from the original horse artwork.

Run: uv run --with opencv-python-headless --with pillow scripts/build-horse-motion.py
"""
from pathlib import Path
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
source = cv2.imread(str(ROOT / "public/gallop.jpg"))
height, width = source.shape[:2]
size = 320
frames = []
for index in range(8):
    x0, x1 = round(index % 4 * width / 4), round((index % 4 + 1) * width / 4)
    y0, y1 = round(index // 4 * height / 2), round((index // 4 + 1) * height / 2)
    frames.append(cv2.resize(source[y0:y1, x0:x1], (size, size), interpolation=cv2.INTER_AREA))

# Stabilize the torso, excluding the moving hooves and tail from registration.
mask = np.zeros((size, size), np.uint8)
mask[90:165, 100:245] = 255
reference = cv2.cvtColor(frames[0], cv2.COLOR_BGR2GRAY)
for index in range(1, 8):
    transform = np.eye(2, 3, dtype=np.float32)
    try:
        _, transform = cv2.findTransformECC(reference, cv2.cvtColor(frames[index], cv2.COLOR_BGR2GRAY), transform, cv2.MOTION_TRANSLATION, (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 100, 0.0001), mask, 5)
        transform[:, 2] = np.clip(transform[:, 2], -24, 24)
        frames[index] = cv2.warpAffine(frames[index], transform, (size, size), flags=cv2.INTER_LINEAR | cv2.WARP_INVERSE_MAP, borderMode=cv2.BORDER_CONSTANT, borderValue=(255, 255, 255))
    except cv2.error:
        pass

flow = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
grid = np.stack(np.meshgrid(np.arange(size, dtype=np.float32), np.arange(size, dtype=np.float32)), axis=-1)
atlas = np.full((size * 8, size * 8, 3), 255, np.uint8)
for index in range(8):
    a, b = frames[index], frames[(index + 1) % 8]
    ga, gb = cv2.cvtColor(a, cv2.COLOR_BGR2GRAY), cv2.cvtColor(b, cv2.COLOR_BGR2GRAY)
    forward = flow.calc(ga, gb, None)
    backward = flow.calc(gb, ga, None)
    for subframe in range(8):
        t = subframe / 8
        left = cv2.remap(a, grid - t * forward, None, cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=(255, 255, 255))
        right = cv2.remap(b, grid - (1 - t) * backward, None, cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=(255, 255, 255))
        blended = cv2.addWeighted(left, 1 - t, right, t, 0)
        frame = index * 8 + subframe
        row, col = divmod(frame, 8)
        atlas[row * size:(row + 1) * size, col * size:(col + 1) * size] = blended

Image.fromarray(cv2.cvtColor(atlas, cv2.COLOR_BGR2RGB)).save(ROOT / "public/gallop-motion.webp", quality=88, method=6)
print("Generated 64 aligned motion frames in public/gallop-motion.webp")

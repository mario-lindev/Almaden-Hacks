"use client";
import { useRef } from "react";
import AsciiCanvas from "./AsciiCanvas";

export const ridges = [
  "M-50 192C20 184 60 150 100 151S145 132 180 125 211 133 235 115 264 106 290 81 308 91 331 65 350 77 365 49 382 67 408 59 431 85 453 71 480 97 504 90 529 107 558 99 584 124 620 112 647 139 674 126 702 111 730 92 751 106 776 87 802 100 822 75 849 89 874 65 898 79 925 63 948 86 976 77 1000 98 1021 82 1049 111 1072 102 1090 126 1116 114 1140 142 1185 132 1220 156 1260 145 1294 163 1325 157 1360 177 1400 169 1490 194V400H-50Z",
  "M-50 246C10 234 46 207 84 209S143 174 178 181 224 151 262 162 305 135 343 153 391 135 432 166 474 155 512 183 550 174 589 201 620 181 655 187 694 161 725 176 757 148 798 157 833 140 864 157 900 141 938 171 968 161 1001 187 1039 175 1074 201 1101 190 1140 211 1176 201 1217 218 1260 207 1304 231 1360 215 1490 247V400H-50Z",
  "M-50 282C50 270 105 222 173 235S270 199 333 219 424 209 486 245 587 233 648 260 738 226 805 240 894 219 964 250 1050 229 1120 263 1235 244 1306 271 1405 249 1490 286V400H-50Z",
  "M-50 343C82 310 165 302 265 316S427 303 522 323 660 329 753 314 900 300 994 317 1150 294 1253 314 1415 303 1490 329V400H-50Z",
];
export default function Mountains({ className = "" }: { className?: string }) {
  const paths = useRef<Path2D[]>([]);
  const colors = ["#739bb2", "#4f8e91", "#4e854e", "#28613e"];
  return <div className={`mountains ${className}`} aria-hidden="true">
    <svg className="mountain-color" viewBox="0 0 1440 400" preserveAspectRatio="none">
      {ridges.map((path, i) => <path key={path} d={path} fill={colors[i]} />)}
    </svg>
    <AsciiCanvas label="Textured ASCII foothills" cell={w => w < 600 ? 3 : 4} fps={1} layers={(_t, w, h) => {
      if (!paths.current.length) paths.current = ridges.map(path => new Path2D(path));
      return paths.current.map((path, i) => ({
        color: colors[i],
        draw: s => {
          s.scale(w / 1440, h / 400);
          s.save();
          s.clip(path);
          const shade = s.createLinearGradient(0, 50 + i * 65, 0, 420);
          shade.addColorStop(0, "#555");
          shade.addColorStop(1, "#aaa");
          s.fillStyle = shade;
          s.fillRect(0, 0, 1440, 400);
          // Fixed drainage lines and grain give the slopes relief without flickering.
          for (let x = -40; x < 1480; x += 12) {
            const crest = 70 + i * 65 + Math.sin(x * 0.017 + i) * 28;
            s.beginPath();
            s.moveTo(x, crest);
            s.bezierCurveTo(x + 25, crest + 55, x - 35, crest + 105, x + 70, 440);
            s.strokeStyle = `rgba(0,0,0,${0.07 + (Math.sin(x * 1.7) + 1) * 0.06})`;
            s.lineWidth = 2 + i;
            s.stroke();
          }
          for (let y = 70; y < 400; y += 6) for (let x = 0; x < 1440; x += 6) {
            const grain = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
            if (grain - Math.floor(grain) > 0.66) {
              s.fillStyle = "#555";
              s.fillRect(x, y, 2, 2);
            }
          }
          s.restore();
        },
      }));
    }} />
  </div>;
}

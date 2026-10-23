// Removes a plain white/near-white background from a photo by flood-filling
// inward from the image edges. Only background connected to the border is
// removed, so whites inside the subject (watch face, eyes) are preserved.
// Edge pixels get a soft alpha ramp so the outline doesn't look jagged.

const SOLID = 248; // at or above this, a background pixel is fully transparent
const EDGE = 205; // between EDGE and SOLID, alpha ramps for a soft edge

export function removeWhiteBackground(data: ImageData): ImageData {
  const { width: w, height: h, data: px } = data;
  const visited = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  let top = 0;

  const isBg = (i: number) => {
    const o = i * 4;
    const r = px[o];
    const g = px[o + 1];
    const b = px[o + 2];
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    return min >= EDGE && max - min < 28;
  };

  const push = (i: number) => {
    if (!visited[i] && isBg(i)) {
      visited[i] = 1;
      stack[top++] = i;
    }
  };

  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }

  while (top > 0) {
    const i = stack[--top];
    const x = i % w;
    const y = (i - x) / w;
    const o = i * 4;
    const min = Math.min(px[o], px[o + 1], px[o + 2]);
    px[o + 3] = min >= SOLID ? 0 : Math.round(255 * (1 - (min - EDGE) / (SOLID - EDGE)));

    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (y > 0) push(i - w);
    if (y < h - 1) push(i + w);
  }

  return data;
}
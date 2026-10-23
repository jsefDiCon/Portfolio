import { useEffect, useState } from 'react';
import { removeWhiteBackground } from '../utils/cutout';

// Returns a transparent-background version of the image, or null while
// processing / if the browser can't read the image (e.g. blocked by CORS).
export function useCutout(src: string) {
  const [cutout, setCutout] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.putImageData(removeWhiteBackground(data), 0, 0);
        canvas.toBlob((blob) => {
          if (blob && !cancelled) setCutout(URL.createObjectURL(blob));
        }, 'image/png');
      } catch {

        // Canvas was tainted — keep the fallback rendering.
      }};
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => () => {
    if (cutout) URL.revokeObjectURL(cutout);
  }, [cutout]);

  return cutout;
}
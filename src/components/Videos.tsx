import React from 'react';
import { PlayIcon } from 'lucide-react';
import { longVideos, montages, reels, VideoItem } from '../data/videos';
import { Reveal } from './Reveal';

type Orientation = 'vertical' | 'horizontal';

const groups: {label: string;size: string;items: VideoItem[];orientation: Orientation;}[] = [
{ label: 'Reels', size: '1080 × 1920', items: reels, orientation: 'vertical' },
{ label: 'Montage', size: '1080 × 1920', items: montages, orientation: 'vertical' },
{ label: 'Long Videos', size: '1920 × 1080', items: longVideos, orientation: 'horizontal' }];


export function Videos() {
  return (
    <section id="videos" className="w-full scroll-mt-16 bg-paper pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <h2 className="border-t border-line pt-16 font-display text-5xl font-black tracking-[-0.03em] text-ink md:pt-20 md:text-6xl">
            Videos<span className="text-violet">.</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-16">
          {groups.map((g) =>
          <div key={g.label}>
              <Reveal className="mb-6 flex items-baseline gap-3">
                <h3 className="font-display text-2xl font-extrabold text-ink md:text-3xl">{g.label}</h3>
                <span className="rounded-full bg-volt px-2.5 py-0.5 text-xs font-semibold tabular-nums text-coal">
                  {g.size}
                </span>
              </Reveal>
              <ul
              className={
              g.orientation === 'vertical' ?
              'grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4' :
              'grid gap-5 md:grid-cols-2'
              }>
              
                {g.items.map((item, i) =>
              <li key={`${g.label}-${i}`}>
                    <Reveal delay={i * 0.04}>
                      <VideoFrame item={item} orientation={g.orientation} size={g.size} />
                    </Reveal>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function VideoFrame({ item, orientation, size }: {item: VideoItem;orientation: Orientation;size: string;}) {
  const ratio = orientation === 'vertical' ? 'aspect-[9/16]' : 'aspect-video';

  if (!item.src) {
    return (
      <div
        className={`${ratio} flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line bg-surface text-center`}>
        
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 text-muted">
          <PlayIcon className="h-5 w-5 translate-x-px" aria-hidden="true" />
        </span>
        <span className="px-4 text-sm font-medium text-muted">
          {item.title}
          <span className="block text-xs tabular-nums opacity-70">{size}</span>
        </span>
      </div>);

  }

  return (
    <video
      src={item.src}
      poster={item.poster}
      controls
      playsInline
      preload="metadata"
      aria-label={item.title}
      className={`${ratio} w-full rounded-2xl bg-coal object-cover`} />);


}
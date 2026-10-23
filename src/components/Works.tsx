import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon, XIcon } from 'lucide-react';
import { works } from '../data/portfolio';
import { useElementWidth } from '../hooks/useElementWidth';
import { Reveal } from './Reveal';

type Work = (typeof works)[number];
const ease = [0.23, 1, 0.32, 1] as const;

export function Works() {
  // Unbounded index — wraps around forever in both directions.
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<Work | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  const width = useElementWidth(stageRef);

  const n = works.length;
  const cardW = Math.round(Math.min(400, Math.max(200, width * 0.32)));
  const go = (delta: number) => setActive((a) => a + delta);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <section id="works" className="w-full scroll-mt-16 overflow-hidden bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <h2 className="font-display text-5xl font-black tracking-[-0.03em] text-ink md:text-6xl">
            My Works<span className="text-violet">.</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={stageRef}
          className="relative mt-14 w-full outline-none focus-visible:ring-2 focus-visible:ring-violet"
          style={{ perspective: 1400, height: cardW + 20 }}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="My works"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
          }}>
          
          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ transformStyle: 'preserve-3d' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => dragged.current = true}
            onDragEnd={(_, info) => {
              const { offset, velocity } = info;
              const steps = Math.max(1, Math.round(Math.abs(offset.x) / (cardW * 0.4)));
              if (offset.x < -50 || velocity.x < -500) go(steps);else
              if (offset.x > 50 || velocity.x > 500) go(-steps);
              setTimeout(() => dragged.current = false, 0);
            }}>
            
            {works.map((w, i) => {
              const off = circularOffset(i, active, n);
              const abs = Math.abs(off);
              const sign = Math.sign(off);
              const x = off === 0 ? 0 : sign * (cardW * 0.66 + (abs - 1) * cardW * 0.3);
              const hidden = abs > 3;
              return (
                <motion.button
                  key={w.src}
                  type="button"
                  aria-label={off === 0 ? `Open ${w.title}` : `Show ${w.title}`}
                  aria-hidden={hidden}
                  tabIndex={-1}
                  onClick={() => {
                    if (dragged.current) return;
                    if (off === 0) setOpen(w);else
                    go(off);
                  }}
                  className="group absolute left-1/2 top-0 overflow-hidden rounded-2xl bg-surface shadow-[0_24px_50px_-20px_rgba(10,10,11,0.45)]"
                  style={{
                    width: cardW,
                    height: cardW,
                    marginLeft: -cardW / 2,
                    zIndex: 100 - abs,
                    pointerEvents: hidden ? 'none' : 'auto'
                  }}
                  initial={false}
                  animate={{
                    x,
                    rotateY: off === 0 ? 0 : -sign * 48,
                    scale: off === 0 ? 1 : 0.84,
                    opacity: hidden ? 0 : 1 - Math.max(0, abs - 1) * 0.18
                  }}
                  transition={{ duration: 0.3, ease }}>
                  
                  <img
                    src={w.src}
                    alt={w.title}
                    draggable={false}
                    className="h-full w-full select-none object-cover" />
                  
                  {off === 0 &&
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-coal opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      <ExpandIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  }
                </motion.button>);

            })}
          </motion.div>
        </div>
      </Reveal>

      <div className="mt-12 flex items-center justify-center gap-24 sm:gap-40">
        <ArrowButton label="Previous work" onClick={() => go(-1)}>
          <ChevronLeftIcon className="h-6 w-6" />
        </ArrowButton>
        <ArrowButton label="Next work" onClick={() => go(1)}>
          <ChevronRightIcon className="h-6 w-6" />
        </ArrowButton>
      </div>

      <AnimatePresence>
        {open &&
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-coal/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}>
          
            <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease }}
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}>
            
              <img src={open.src} alt={open.title} className="max-h-[82vh] w-full rounded-xl object-contain" />
              <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute -top-3 right-0 -translate-y-full rounded-full bg-white p-2 text-coal transition-colors duration-150 hover:bg-violet hover:text-white md:-right-3 md:top-0 md:translate-x-full md:translate-y-0"
              aria-label="Close"
              autoFocus>
              
                <XIcon className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}

function ArrowButton({
  label,
  onClick,
  children




}: {label: string;onClick: () => void;children: React.ReactNode;}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.12 }}
      className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2">
      
      {children}
    </motion.button>);

}

// Shortest signed distance from the active slot to item i on a loop of n items.
function circularOffset(i: number, active: number, n: number) {
  const pos = (active % n + n) % n;
  let d = i - pos;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}
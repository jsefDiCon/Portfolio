import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRightIcon, MousePointer2Icon } from 'lucide-react';
import { portraitUrl } from '../data/portfolio';
import { useCutout } from '../hooks/useCutout';

const ease = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const cutout = useCutout(portraitUrl);
  return (
    <section id="top" className="relative w-full overflow-hidden bg-paper">
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        {/* Corner labels */}
        <div className="flex items-start justify-between pt-6 text-[11px] font-bold uppercase leading-tight tracking-[0.14em] text-ink md:text-xs">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            Social Media Design
            <br />
            &amp; Video <span className="text-violet">→</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="hidden text-right sm:block">
            
            Creative by
            <br />
            Jsef
          </motion.p>
        </div>

        <div className="grid items-end gap-6 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[5fr_7fr] lg:gap-10">
          {/* Portrait */}
          <div className="relative order-2 mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:order-1 lg:max-w-[480px]">
            <div className="relative aspect-[1064/1650] w-full">
              {/* Fallback only: light backdrop if the background couldn't be removed */}
              {!cutout &&
              <div
                className="absolute inset-x-0 bottom-0 top-[4%] rounded-t-full bg-[#F4F4F2]"
                aria-hidden="true" />

              }
              <svg
                viewBox="0 0 645 1000"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true">
                
                <motion.path
                  d="M -260 260 C 40 260, 110 520, 30 760 S 160 1040, 420 1100"
                  fill="none"
                  stroke="#C8F031"
                  strokeWidth="78"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease, delay: 0.15 }} />
                
                <motion.path
                  d="M 900 80 C 600 150, 520 400, 640 620 S 560 900, 300 1080"
                  fill="none"
                  stroke="#6D2BFF"
                  strokeWidth="60"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease, delay: 0.3 }} />
                
              </svg>
              <motion.img
                src={cutout ?? portraitUrl}
                alt="Jsef in a black shirt with arms crossed"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease, delay: 0.35 }}
                className={`relative h-full w-full object-contain object-bottom ${cutout ? '' : 'mix-blend-multiply'}`} />
              
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 pt-10 lg:order-2 lg:pb-24 lg:pt-0">
            <motion.span
              initial={{ opacity: 0, scale: 0.96, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{ duration: 0.25, ease, delay: 0.2 }}
              className="mb-3 inline-block rounded-xl bg-volt px-4 py-1.5 font-display text-xl font-extrabold text-coal md:text-2xl">
              
              Hello!!
            </motion.span>

            <h1 className="font-display text-6xl font-black leading-[0.95] tracking-[-0.04em] text-ink sm:text-7xl lg:text-[6.5rem]">
              <Line delay={0.25}>
                <Highlight color="bg-violet" delay={0.45} className="text-white">
                  Jsef&rsquo;s
                </Highlight>
              </Line>
              <Line delay={0.33}>Portfolio</Line>
            </h1>

            <div className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl">
              <Line delay={0.41}>Digital Creative &amp;</Line>
              <Line delay={0.49}>
                <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <Highlight color="bg-volt" delay={0.65} className="text-coal">
                    Virtual Assistant
                  </Highlight>
                </span>
              </Line>
              <motion.span
                initial={{ opacity: 0, scale: 0.96, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ duration: 0.25, ease, delay: 0.8 }}
                className="relative ml-1 mt-3 inline-flex items-center rounded-xl bg-violet px-3 py-1 text-xl text-white lg:text-2xl">
                
                Viral-ready
                <motion.span
                  className="absolute -bottom-5 -right-6 text-violet"
                  animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true">
                  
                  <MousePointer2Icon className="h-7 w-7 -rotate-12 fill-violet" />
                </motion.span>
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease, delay: 0.9 }}>
              
              <div className="mt-8 flex max-w-lg items-start gap-3">
                <img
                  src={portraitUrl}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-full border-2 border-volt bg-white object-cover object-[50%_22%]" />
                
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  Designing the visuals. Editing the story. Building the web. Managing the chaos. Let&rsquo;s
                  create content that converts and a brand that stands out.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#works"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-violet hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2">
                  
                  See my work
                  <ArrowDownRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#contact"
                  className="whitespace-nowrap rounded-full border-2 border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2">
                  
                  Let&rsquo;s talk
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}

function Line({ children, delay }: {children: React.ReactNode;delay: number;}) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease, delay }}>
        
        {children}
      </motion.span>
    </span>);

}

function Highlight({
  children,
  color,
  delay,
  className = ''





}: {children: React.ReactNode;color: string;delay: number;className?: string;}) {
  return (
    <span className={`relative inline-block px-3 ${className}`}>
      <motion.span
        aria-hidden="true"
        className={`absolute inset-0 rounded-2xl ${color}`}
        style={{ originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease, delay }} />
      
      <span className="relative">{children}</span>
    </span>);

}
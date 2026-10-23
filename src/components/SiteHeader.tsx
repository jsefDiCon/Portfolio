import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const links = [
{ href: '#top', label: 'Home' },
{ href: '#about', label: 'About' },
{ href: '#works', label: 'Works' },
{ href: '#videos', label: 'Videos' },
{ href: '#contact', label: 'Contact' }];


export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="font-display text-lg font-black tracking-tight text-ink">
          Jsef<span className="text-violet">.</span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {links.map((l) =>
          <a
            key={l.href}
            href={l.href}
            className="hidden whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink md:inline-block">
            
              {l.label}
            </a>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative ml-1 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line text-ink transition-colors duration-150 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet">
            
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -60, scale: 0.96 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.96 }}
                transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}>
                
                {isDark ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a
            href="#contact"
            className="ml-1 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-violet hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2">
            
            Hire me
          </a>
        </nav>
      </div>
    </header>);

}
import React from 'react';
import { MotionConfig } from 'framer-motion';
import { SiteHeader } from './components/SiteHeader';
import { Hero } from './components/Hero';
import { SoftwareMarquee } from './components/SoftwareMarquee';
import { About } from './components/About';
import { Works } from './components/Works';
import { Videos } from './components/Videos';
import { Contact } from './components/Contact';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full bg-paper font-sans text-ink antialiased">
        <SiteHeader />
        <main>
          <Hero />
          <SoftwareMarquee />
          <About />
          <Works />
          <Videos />
          <Contact />
        </main>
      </div>
    </MotionConfig>);

}
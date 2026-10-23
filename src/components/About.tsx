import React from 'react';
import { UsersIcon } from 'lucide-react';
import { experience, languages, leadership, skills } from '../data/portfolio';
import { Reveal } from './Reveal';

export function About() {
  return (
    <section id="about" className="w-full scroll-mt-16 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <h2 className="font-display text-5xl font-black tracking-[-0.03em] text-ink md:text-6xl">
                About Me<span className="text-violet">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 text-lg leading-relaxed text-ink md:text-xl">
                I am a versatile Digital Creative and Virtual Assistant specializing in Video Editing, Graphic
                Design, and Web Design.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                I have a proven track record of producing viral-ready short-form content optimized for TikTok,
                Instagram Reels, YouTube Shorts, and Meta platforms. By combining high-converting UGC, faceless
                video strategies, and trend-driven marketing, I help brands maximize audience retention, craft
                compelling hooks, and elevate their online presence through seamless visual storytelling and
                efficient administrative support.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink">Skills</h3>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((s) =>
                  <li key={s} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper">
                      {s}
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink">Languages</h3>
                <ul className="flex flex-wrap gap-2">
                  {languages.map((l) =>
                  <li key={l} className="rounded-full bg-volt px-4 py-2 text-sm font-semibold text-coal">
                      {l}
                    </li>
                  )}
                </ul>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="font-display text-2xl font-extrabold text-ink">Work Experience</h3>
            </Reveal>
            <ol className="relative mt-8 border-l-2 border-ink">
              {experience.map((job) =>
              <li key={job.company} className="relative pb-12 pl-8 last:pb-0 md:pl-10">
                  <Reveal>
                    <span
                    className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-ink bg-violet"
                    aria-hidden="true" />
                  
                    <p className="font-display text-2xl font-extrabold text-ink md:text-3xl">
                      {job.role} <span className="text-violet">@ {job.company}</span>
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {job.points.map((p) =>
                    <li key={p} className="flex max-w-2xl gap-3 text-base leading-relaxed text-muted">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                          {p}
                        </li>
                    )}
                    </ul>
                  </Reveal>
                </li>
              )}
            </ol>

            <div className="mt-12 border-t border-line pt-8">
              <Reveal>
                <h3 className="mb-5 text-sm font-semibold text-ink">Leadership</h3>
              </Reveal>
              <ul className="space-y-6">
                {leadership.map((item, i) =>
                <li key={item.role}>
                    <Reveal delay={i * 0.05} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet text-white">
                        <UsersIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-semibold text-ink">
                          {item.role} <span className="text-muted">@ {item.org}</span>
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{item.summary}</p>
                      </div>
                    </Reveal>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
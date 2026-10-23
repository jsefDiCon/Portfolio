import React, { useState } from 'react';
import { ArrowRightIcon, CheckCircle2Icon, Loader2Icon, MailIcon } from 'lucide-react';
import { contactEmail } from '../data/portfolio';
import { Reveal } from './Reveal';

type Status = 'idle' | 'sending' | 'sent';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  const field =
  'w-full rounded-xl border-2 bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-white/40 transition-colors duration-150 focus:outline-none focus:border-accent';

  return (
    <section id="contact" className="w-full scroll-mt-16 bg-night py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col">
          <h2 className="font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] md:text-7xl">
            Let&rsquo;s Work
            <br />
            Together<span className="text-volt">.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/70">
            Need scroll-stopping short-form videos or social graphics? Tell me about your project.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-10 inline-flex w-fit items-center gap-3 border-b-2 border-volt pb-1 font-display text-xl font-bold text-white transition-colors duration-150 hover:text-volt md:text-2xl">
            
            <MailIcon className="h-5 w-5 text-volt" aria-hidden="true" />
            {contactEmail}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          {status === 'sent' ?
          <div className="flex h-full flex-col items-start justify-center rounded-2xl bg-white/5 p-8" role="status">
              <CheckCircle2Icon className="h-10 w-10 text-accent" aria-hidden="true" />
              <p className="mt-4 font-display text-2xl font-bold">Message sent!</p>
              <p className="mt-2 text-white/70">Thanks for reaching out — I&rsquo;ll get back to you soon.</p>
              <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm font-semibold text-white underline underline-offset-4 hover:text-accent">
              
                Send another message
              </button>
            </div> :

          <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name} id="name">
                  <input
                  id="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  className={`${field} ${errors.name ? 'border-red-400' : 'border-white/15'}`} />
                
                </Field>
                <Field label="Email" error={errors.email} id="email">
                  <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@email.com"
                  aria-invalid={!!errors.email}
                  className={`${field} ${errors.email ? 'border-red-400' : 'border-white/15'}`} />
                
                </Field>
              </div>
              <Field label="Message" error={errors.message} id="message">
                <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell me about your project, platform, and timeline…"
                aria-invalid={!!errors.message}
                className={`${field} resize-none ${errors.message ? 'border-red-400' : 'border-white/15'}`} />
              
              </Field>
              <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-display text-lg font-extrabold text-white transition-colors duration-150 hover:bg-violet disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-night sm:w-auto">
              
                {status === 'sending' ?
              <>
                    <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
                  </> :

              <>
                    Send Message <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                  </>
              }
              </button>
            </form>
          }
        </Reveal>
      </div>

      <footer className="mx-auto mt-20 flex max-w-7xl flex-wrap justify-between gap-2 border-t border-white/10 px-5 pt-8 text-sm text-white/50 md:px-10">
        <p>© {new Date().getFullYear()} Jsef. All rights reserved.</p>
        <p>Digital Creative &amp; Virtual Assistant</p>
      </footer>
    </section>);

}

function Field({
  label,
  error,
  id,
  children





}: {label: string;error?: string;id: string;children: React.ReactNode;}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white/80">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>);

}

function validate(f: {name: string;email: string;message: string;}): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Please enter a valid email.';
  if (f.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
  return e;
}
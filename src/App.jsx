import { useEffect, useState } from 'react'

/* ---------------------------------------------------------------------------
   Kenya landing page. Separate from hire.automationarchitecthq.com on purpose:
   this one prices in KSh and leads with problems a Nyeri business owner
   recognises, not with Docker and idempotency.

   This page is also the portfolio. Every prospect on the no-website list will
   judge what I'd build for them by looking at this — so it has to be the
   standard, not a brochure about the standard.

   SALES-KIT.md: never show USD and KES pricing to the same person.
--------------------------------------------------------------------------- */

const WHATSAPP = '254717252826'
const CONTACT_EMAIL = 'hello@automationarchitecthq.com'
const WEBHOOK_URL = 'https://n8n.automationarchitecthq.com/webhook/kenya-lead'
const AVAILABILITY_URL = 'https://n8n.automationarchitecthq.com/webhook/availability'

const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`

/* -------------------------------------------------------------------------- */

function Availability() {
  const [avail, setAvail] = useState(null)

  useEffect(() => {
    let alive = true
    fetch(AVAILABILITY_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && d && setAvail(d))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  // Never assert a number we could not confirm. No data, no strip.
  if (!avail) return null

  const bits = []
  if (Number(avail.slots) > 0) bits.push(`${avail.slots} project slots open`)
  if (avail.nextStart) bits.push(`starting ${avail.nextStart}`)
  if (Number(avail.replyHours) > 0) bits.push(`replies within ${avail.replyHours} hours`)
  if (!bits.length) return null

  return (
    <div className="border-b border-cx-border bg-cx-surface/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-6 py-3">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cx-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cx-accent" />
        </span>
        <p className="text-center text-sm text-cx-muted">{bits.join('  ·  ')}</p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

const PROBLEMS = [
  {
    n: '01',
    t: 'The enquiry that came in at 11pm',
    d: 'Somebody asked about a room, a table, an appointment. Nobody saw it until 8am. By then they had messaged three other places.',
  },
  {
    n: '02',
    t: 'The follow-up nobody made',
    d: 'They asked for a price. You sent it. Then everyone got busy. Most enquiries are not lost to competitors — they are lost to silence.',
  },
  {
    n: '03',
    t: 'The same message, forty times a day',
    d: '"Are you open?" "Where are you?" "How much?" Someone answers these all day instead of doing work only a person can do.',
  },
  {
    n: '04',
    t: 'Nothing to find when they search',
    d: 'Somebody hears about you and looks you up. If there is nothing there, they go to the business they can actually see.',
  },
]

const PACKAGES = [
  {
    name: 'Website',
    price: '45,000',
    deposit: '22,500',
    time: 'About a week',
    who: 'Anyone with no website, or one that no longer works',
    bullets: [
      'One page, on a domain that belongs to you',
      'Your photos, prices, hours and location',
      'A WhatsApp button so people message you directly',
      'Works properly on a phone — most of your visitors',
      'Hosting and domain handled for the first year',
    ],
    featured: false,
  },
  {
    name: 'Enquiry System',
    price: '35,000',
    deposit: '17,500',
    time: '2–3 days',
    who: 'Restaurants, hotels, clinics, schools',
    bullets: [
      'Instant reply to every enquiry, day or night',
      'Common questions answered automatically',
      'Anything needing a person goes straight to your phone',
      'Every enquiry logged — nothing lost in somebody’s phone',
      'Alerts when something breaks, before a customer notices',
    ],
    featured: true,
  },
  {
    name: 'Full Pipeline',
    price: '75,000',
    deposit: '37,500',
    time: '5 days',
    who: 'Real estate, car dealers, tour operators, hotels',
    bullets: [
      'Everything in the Enquiry System',
      'Automatic follow-up if nobody replied in two days',
      'A pipeline you can see — who is waiting on what',
      'Weekly summary of what came in and what closed',
    ],
    featured: false,
  },
]

const EXTRAS = [
  ['Content engine — one video becomes a week of posts', '90,000'],
  ['Monthly support and changes', '40,000 – 80,000 / month'],
  ['One-off automation (single job, single tool)', 'from 20,000'],
]

/* These are the questions I actually get asked. They are on the page because
   people want them answered — the FAQ schema in index.html mirrors them word
   for word, which is the only honest way to use it. */
export const FAQS = [
  {
    q: 'How much does a website cost in Kenya?',
    a: 'KSh 45,000 for a one-page website on your own domain, including hosting and the domain for the first year. The Enquiry System that answers messages automatically is KSh 35,000. The full pipeline with automatic follow-up is KSh 75,000. Fixed price, agreed before I start.',
  },
  {
    q: 'How long does it take?',
    a: 'About a week for a website. Two to three days for the Enquiry System. Five days for the full pipeline. I start the day the deposit lands.',
  },
  {
    q: 'How do I pay?',
    a: '50% to start and 50% once it is working, by M-Pesa or bank transfer. The second half is due only after I have shown you the finished thing running with your own details in it.',
  },
  {
    q: 'Do you work outside Nyeri?',
    a: 'Yes. I am based in Nyeri and work with businesses across Kenya — Nairobi, Mombasa and the coast included. Almost all of it is done remotely, so where you are makes no difference to the price.',
  },
  {
    q: 'What if my business already has a website?',
    a: 'Then the question is whether it works. I check whether it loads on a phone, whether search engines can actually see it, and whether enquiries reach you. Plenty of sites are quietly blocking Google or sending emails to an address nobody reads.',
  },
  {
    q: 'What can actually be automated?',
    a: 'Anything repetitive. Answering opening hours and directions, taking booking or appointment requests day and night, chasing people who asked for a price and never heard back, and alerting you the moment something breaks.',
  },
]

const STEPS = [
  { n: '1', t: 'We talk', d: 'Fifteen minutes on WhatsApp or the phone. You tell me what eats the most time. No meeting, no slides.' },
  { n: '2', t: 'I quote a fixed price', d: 'One number for an agreed scope, before anything starts. It does not move.' },
  { n: '3', t: 'Half to begin', d: 'You pay 50%. I start the same day it lands.' },
  { n: '4', t: 'You see it working', d: 'I show you the finished thing running with your own details in it.' },
  { n: '5', t: 'Half on delivery', d: 'The other 50% only once it works. If it never works, you never pay it.' },
]

/* -------------------------------------------------------------------------- */

export default function App() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    const form = new FormData(e.currentTarget)
    const payload = {
      name: String(form.get('name') || '').trim(),
      business: String(form.get('business') || '').trim(),
      contact: String(form.get('contact') || '').trim(),
      problem: String(form.get('problem') || '').trim(),
      source: 'kenya-landing',
    }
    if (!payload.contact) {
      setError('Please leave a phone number or email so I can reply.')
      return
    }
    setBusy(true)
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('bad status')
      setSent(true)
    } catch {
      setError('That did not go through. Please WhatsApp me instead — it is faster anyway.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-cx-bg text-cx-text">
      <Availability />

      {/* ---------------- hero ---------------- */}
      <header className="relative overflow-hidden border-b border-cx-border">
        <div className="cx-grid absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF512F 0%, #DD2476 45%, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-cx-border bg-cx-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cx-muted">
            Nyeri · working across Kenya
          </p>

          <h1 className="max-w-4xl text-[2.6rem] leading-[1.05] sm:text-7xl">
            Your enquiries arrive at night.
            <br />
            <span className="bg-gradient-to-r from-cx-accent to-cx-accent-end bg-clip-text text-transparent">
              Nobody answers until morning.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cx-muted sm:text-xl">
            That is the whole problem. Somebody wants to book, buy or ask a question,
            and the reply comes eleven hours later — after they have already messaged
            somebody else.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cx-muted">
            I build the websites and systems that answer immediately, chase the
            follow-ups nobody remembers, and make sure no enquiry is ever lost.
            Fixed price in shillings, agreed before I start.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <a
              href={waLink("Hi John, I saw your site. I'd like to know what you could build for my business.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-gradient-to-r from-cx-accent to-cx-accent-end px-8 py-4 text-[19px] font-bold text-white shadow-lg shadow-cx-accent/20 transition hover:opacity-90"
            >
              WhatsApp me
            </a>
            <a
              href="#look"
              className="rounded-xl border border-cx-border bg-cx-surface/50 px-8 py-4 text-[19px] font-semibold transition hover:bg-cx-surface"
            >
              Get a free look first
            </a>
          </div>

          <p className="mt-8 max-w-xl text-sm text-cx-muted">
            <span className="font-semibold text-cx-text">50% to start, 50% when it works.</span>{' '}
            No monthly fee unless you want one.
          </p>
        </div>
      </header>

      {/* ---------------- problems ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cx-accent">
          The reason you are losing work
        </p>
        <h2 className="max-w-3xl text-3xl sm:text-5xl">Which of these is happening to you?</h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div
              key={p.t}
              className="group rounded-2xl border border-cx-border bg-cx-surface/60 p-7 transition hover:border-cx-accent/40 hover:bg-cx-surface"
            >
              <span className="font-display text-sm font-bold text-cx-accent">{p.n}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{p.t}</h3>
              <p className="mt-3 leading-relaxed text-cx-muted">{p.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-lg text-cx-muted">
          None of these need a bigger team. They need something that does the
          repetitive part, so your people can do the part that actually needs a person.
        </p>
      </section>

      {/* ---------------- packages ---------------- */}
      <section className="border-y border-cx-border bg-cx-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cx-accent">
            Fixed price, agreed first
          </p>
          <h2 className="text-3xl sm:text-5xl">What it costs</h2>
          <p className="mt-5 max-w-2xl text-lg text-cx-muted">
            One number for an agreed scope, before anything starts. No hourly billing,
            no scope creep, no surprise invoice at the end.
          </p>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <div
                key={p.name}
                className={
                  'relative flex flex-col rounded-2xl border p-7 transition ' +
                  (p.featured
                    ? 'border-cx-accent bg-cx-surface shadow-xl shadow-cx-accent/10'
                    : 'border-cx-border bg-cx-bg hover:border-cx-accent/40')
                }
              >
                {p.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-cx-accent to-cx-accent-end px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Most asked for
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold text-cx-muted">KSh</span>
                  <span className="font-display text-4xl font-extrabold tracking-tight">{p.price}</span>
                </p>
                <p className="mt-2 text-sm text-cx-muted">
                  {p.time} · {p.who}
                </p>

                <ul className="mt-7 flex-1 space-y-3 text-sm leading-relaxed text-cx-muted">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-cx-accent">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-cx-border pt-4 text-xs text-cx-muted">
                  KSh {p.deposit} to start, the rest when it works
                </p>

                <a
                  href={waLink(`Hi John, I'm interested in the ${p.name} (KSh ${p.price}).`)}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    'mt-5 rounded-xl px-5 py-3.5 text-center font-semibold transition ' +
                    (p.featured
                      ? 'bg-gradient-to-r from-cx-accent to-cx-accent-end text-white hover:opacity-90'
                      : 'border border-cx-border hover:bg-cx-surface')
                  }
                >
                  Ask about this
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-cx-border bg-cx-bg p-7">
            <h3 className="font-display font-bold">Also available</h3>
            <ul className="mt-5 space-y-3 text-sm text-cx-muted">
              {EXTRAS.map(([label, price]) => (
                <li key={label} className="flex justify-between gap-6 border-b border-cx-border/60 pb-3 last:border-0 last:pb-0">
                  <span>{label}</span>
                  <span className="whitespace-nowrap font-semibold text-cx-text">KSh {price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- how payment works ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cx-accent">
          No surprises
        </p>
        <h2 className="text-3xl sm:text-5xl">How it works, and how you pay</h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={
                'rounded-2xl border p-6 ' +
                (s.n === '3' || s.n === '5'
                  ? 'border-cx-accent/50 bg-cx-surface'
                  : 'border-cx-border bg-cx-surface/40')
              }
            >
              <span
                className={
                  'inline-flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold ' +
                  (s.n === '3' || s.n === '5'
                    ? 'bg-gradient-to-r from-cx-accent to-cx-accent-end text-white'
                    : 'border border-cx-border text-cx-muted')
                }
              >
                {s.n}
              </span>
              <h3 className="mt-4 font-display font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cx-muted">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-cx-accent/40 bg-gradient-to-br from-cx-surface to-cx-bg p-8">
          <h3 className="font-display text-2xl font-bold">50% to start. 50% when it works.</h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-cx-muted">
            The deposit is how I know you are serious, and it is the day I start. The
            second half is due only once I have shown you the finished thing running
            with your own details in it — not on a date, not on an invoice cycle. If it
            never works, you never pay the second half.
          </p>
          <p className="mt-5 text-sm text-cx-muted">
            <span className="font-semibold text-cx-text">M-Pesa or bank transfer.</span>{' '}
            If a price does not fit your budget, say so — the price is for a fixed
            scope, so the scope can move even when the price cannot.
          </p>
        </div>
      </section>

      {/* ---------------- this page is the proof ---------------- */}
      <section className="border-y border-cx-border bg-cx-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cx-accent">
                What you are looking at
              </p>
              <h2 className="text-3xl sm:text-5xl">This page is the sample</h2>
              <div className="mt-7 space-y-4 text-lg leading-relaxed text-cx-muted">
                <p>
                  You do not have to imagine what I would build for you. You are reading
                  it. Same tools, same standard, same person.
                </p>
                <p>
                  The strip at the top of this page is live — the number of slots and the
                  start date come from a system I run, not from text I typed in. When
                  they change, this page changes.
                </p>
                <p>
                  The form below is connected to a real system. Send it and it records
                  your enquiry, alerts my phone within seconds, and lets me know if
                  anything failed on the way.
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cx-accent">
                Before you ask
              </p>
              <h2 className="text-3xl sm:text-4xl">Yes, I am new at this</h2>
              <div className="mt-7 space-y-4 leading-relaxed text-cx-muted">
                <p>
                  I have been building these systems for my own business, not for a long
                  list of clients. I would rather tell you that than invent testimonials
                  you would find out about later.
                </p>
                <p>
                  What I can show you instead is the work: a system running live, and a
                  written log of all thirty-nine things that broke while I built it —
                  what caused each one and how it was fixed.
                </p>
                <p className="text-cx-text">
                  Most people selling this cannot show you either. No client list, but
                  you see exactly how I work before you pay anything.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://automationarchitecthq.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-cx-border px-6 py-3 font-semibold transition hover:bg-cx-surface"
                >
                  See a live system
                </a>
                <a
                  href="https://youtu.be/ex356ENgQh0"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-cx-border px-6 py-3 font-semibold transition hover:bg-cx-surface"
                >
                  Watch me break one
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cx-accent">
          The questions I get asked
        </p>
        <h2 className="text-3xl sm:text-5xl">Straight answers</h2>

        <div className="mt-14 divide-y divide-cx-border border-y border-cx-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <h3 className="font-display text-lg font-bold sm:text-xl">{f.q}</h3>
                <span className="shrink-0 text-2xl text-cx-accent transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl leading-relaxed text-cx-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------------- form ---------------- */}
      <section id="look" className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cx-accent">
          Free, no obligation
        </p>
        <h2 className="text-3xl sm:text-5xl">Get a free look at your business</h2>
        <p className="mt-5 text-lg text-cx-muted">
          Tell me what eats the most time. I will tell you what could run by itself,
          what it would cost, and whether it is even worth doing. No charge, no
          meeting, no obligation.
        </p>

        {sent ? (
          <div className="mt-12 rounded-2xl border border-cx-accent bg-cx-surface p-9">
            <h3 className="font-display text-2xl font-bold">Got it.</h3>
            <p className="mt-4 text-cx-muted">
              That went into my system and my phone has already buzzed. I will come back
              to you shortly — if you would rather talk now, WhatsApp is faster.
            </p>
            <a
              href={waLink('Hi John, I just filled in the form on your site.')}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-block rounded-xl bg-gradient-to-r from-cx-accent to-cx-accent-end px-7 py-3.5 text-[19px] font-bold text-white"
            >
              Open WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-12 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold">Your name</span>
                <input
                  name="name"
                  className="mt-2 w-full rounded-xl border border-cx-border bg-cx-surface/60 px-4 py-3.5 text-cx-text transition focus:border-cx-accent focus:bg-cx-surface"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Business name</span>
                <input
                  name="business"
                  className="mt-2 w-full rounded-xl border border-cx-border bg-cx-surface/60 px-4 py-3.5 text-cx-text transition focus:border-cx-accent focus:bg-cx-surface"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-semibold">
                Phone or email <span className="text-cx-accent">*</span>
              </span>
              <input
                name="contact"
                required
                className="mt-2 w-full rounded-xl border border-cx-border bg-cx-surface/60 px-4 py-3.5 text-cx-text transition focus:border-cx-accent focus:bg-cx-surface"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold">What takes the most time right now?</span>
              <textarea
                name="problem"
                rows={4}
                className="mt-2 w-full rounded-xl border border-cx-border bg-cx-surface/60 px-4 py-3.5 text-cx-text transition focus:border-cx-accent focus:bg-cx-surface"
              />
            </label>

            {error && (
              <p className="rounded-xl border border-cx-accent bg-cx-surface px-4 py-3.5 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-gradient-to-r from-cx-accent to-cx-accent-end px-7 py-4 text-[19px] font-bold text-white shadow-lg shadow-cx-accent/20 transition hover:opacity-90 disabled:opacity-60"
            >
              {busy ? 'Sending…' : 'Send it'}
            </button>
          </form>
        )}
      </section>

      {/* ---------------- footer ---------------- */}
      <footer className="border-t border-cx-border pb-24 sm:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-12 text-sm text-cx-muted sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display font-bold text-cx-text">The Automation Architect</p>
            <p className="mt-1">John · Nyeri, Kenya · working across the country</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a className="transition hover:text-cx-text" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <a
              className="transition hover:text-cx-text"
              href={waLink('Hi John')}
              target="_blank"
              rel="noreferrer"
            >
              0717 252 826
            </a>
          </div>
        </div>
      </footer>

      {/* ---------------- sticky WhatsApp bar, phones only ---------------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-cx-border bg-cx-bg/95 p-3 backdrop-blur sm:hidden">
        <a
          href={waLink('Hi John, I saw your site.')}
          target="_blank"
          rel="noreferrer"
          className="block rounded-xl bg-gradient-to-r from-cx-accent to-cx-accent-end px-6 py-3.5 text-center text-[19px] font-bold text-white"
        >
          WhatsApp me
        </a>
      </div>
    </div>
  )
}

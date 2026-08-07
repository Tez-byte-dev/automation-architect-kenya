import { useEffect, useState } from 'react'

/* ---------------------------------------------------------------------------
   Kenya landing page. Separate from hire.automationarchitecthq.com on purpose:
   this one prices in KSh and leads with problems a Mombasa business owner
   recognises, not with Docker and idempotency.

   SALES-KIT.md: never show USD and KES pricing to the same person.
--------------------------------------------------------------------------- */

const WHATSAPP = '254717252826'
const CONTACT_EMAIL = 'hello@automationarchitecthq.com'
const WEBHOOK_URL = 'https://n8n.automationarchitecthq.com/webhook/kenya-lead'
const AVAILABILITY_URL = 'https://n8n.automationarchitecthq.com/webhook/availability'

const waLink = (msg) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`

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
  if (avail.nextStart) bits.push(`next start ${avail.nextStart}`)
  if (Number(avail.replyHours) > 0) bits.push(`replies within ${avail.replyHours} hours`)
  if (!bits.length) return null

  return (
    <div className="border-b border-cx-border bg-cx-surface/60">
      <p className="mx-auto max-w-5xl px-6 py-3 text-center text-sm text-cx-muted">
        {bits.join('  ·  ')}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

const PROBLEMS = [
  {
    t: 'The enquiry that came in at 11pm',
    d: 'Somebody asked about a room, a viewing, an appointment. Nobody saw it until 8am. By then they had messaged three other places.',
  },
  {
    t: 'The follow-up nobody made',
    d: 'They asked for a price. You sent it. Then everyone got busy and it was never mentioned again. Most enquiries are not lost to competitors — they are lost to silence.',
  },
  {
    t: 'The same message, forty times a day',
    d: '"Are you open?" "Where are you?" "How much?" Somebody on your team answers these all day instead of doing work only a person can do.',
  },
  {
    t: 'The report somebody types out every Monday',
    d: 'The same numbers, copied from the same places, into the same spreadsheet. Two hours a week, every week, forever.',
  },
]

const PACKAGES = [
  {
    name: 'Enquiry System',
    price: 'KSh 35,000',
    time: '2–3 days',
    who: 'Restaurants, hotels, clinics, schools',
    bullets: [
      'WhatsApp and website enquiries land in one place',
      'Automatic reply in seconds, day or night',
      'Every enquiry logged — nothing lost in a phone',
      'Alerts to whoever is on duty',
    ],
    featured: false,
  },
  {
    name: 'Lead Follow-Up System',
    price: 'KSh 75,000',
    time: '5 days',
    who: 'Real estate, car dealers, insurance, tour operators',
    bullets: [
      'Everything in the Enquiry System',
      'Automatic follow-up two days later if nobody replied',
      'A pipeline you can actually see — who is waiting on what',
      'Weekly summary of what came in and what closed',
      'Error alerts, so you find out before your customer does',
    ],
    featured: true,
  },
  {
    name: 'Content Engine',
    price: 'KSh 90,000',
    time: '7 days',
    who: 'Anyone who posts, and keeps running out of things to post',
    bullets: [
      'One recording becomes a week of short-form content',
      'Hooks, captions and timestamps chosen for you',
      'Scheduled into a calendar, not a pile of drafts',
      'The editing still takes a person. Deciding what to cut does not.',
    ],
    featured: false,
  },
]

const EXTRAS = [
  ['Landing page, built and live on your own domain', 'KSh 45,000'],
  ['Monthly support and changes', 'KSh 40,000 – 80,000 / month'],
  ['One-off automation (single job, single tool)', 'from KSh 20,000'],
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
      setError(
        'That did not go through. Please WhatsApp me instead — it is faster anyway.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-cx-bg text-cx-text">
      <Availability />

      {/* ---------------- hero ---------------- */}
      <header className="cx-grid border-b border-cx-border">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cx-muted">
            Mombasa · working across Kenya
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-6xl">
            Your enquiries arrive at night.
            <br />
            <span className="bg-gradient-to-r from-cx-accent to-cx-accent-end bg-clip-text text-transparent">
              Nobody answers until morning.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cx-muted">
            That is the whole problem. Somebody wants to book, buy or ask a
            question, and the reply comes eleven hours later — after they have
            already messaged somebody else.
          </p>
          <p className="mt-4 max-w-2xl text-lg text-cx-muted">
            I build the systems that answer immediately, chase the follow-ups
            nobody remembers, and make sure no enquiry is ever lost in somebody's
            phone. Fixed price, in shillings, before I start.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={waLink(
                "Hi, I saw your site. I'd like to know what you could automate for my business.",
              )}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-gradient-to-r from-cx-accent to-cx-accent-end px-7 py-4 text-[19px] font-bold text-white transition hover:opacity-90"
            >
              WhatsApp me
            </a>
            <a
              href="#look"
              className="rounded-lg border border-cx-border px-7 py-4 text-[19px] font-semibold text-cx-text transition hover:bg-cx-surface"
            >
              Get a free look first
            </a>
          </div>
        </div>
      </header>

      {/* ---------------- problems ---------------- */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl sm:text-4xl">Which of these is happening to you?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div
              key={p.t}
              className="rounded-xl border border-cx-border bg-cx-surface p-6"
            >
              <h3 className="font-display text-lg font-bold">{p.t}</h3>
              <p className="mt-3 text-cx-muted">{p.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-cx-muted">
          None of these need a bigger team. They need something that does the
          repetitive part so your people can do the part that actually needs a
          person.
        </p>
      </section>

      {/* ---------------- packages ---------------- */}
      <section className="border-y border-cx-border bg-cx-surface/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl sm:text-4xl">What it costs</h2>
          <p className="mt-4 max-w-2xl text-cx-muted">
            Fixed price, agreed before anything starts. Half to begin, half when
            it is working. No hourly billing, no scope creep, no surprise
            invoice.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <div
                key={p.name}
                className={
                  'flex flex-col rounded-xl border p-6 ' +
                  (p.featured
                    ? 'border-cx-accent bg-cx-surface'
                    : 'border-cx-border bg-cx-bg')
                }
              >
                {p.featured && (
                  <span className="mb-4 self-start rounded bg-gradient-to-r from-cx-accent to-cx-accent-end px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Most asked for
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-3xl font-bold">{p.price}</p>
                <p className="mt-1 text-sm text-cx-muted">
                  {p.time} · {p.who}
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-cx-muted">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-cx-accent">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Hi, I'm interested in the ${p.name} (${p.price}).`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 rounded-lg border border-cx-border px-5 py-3 text-center font-semibold transition hover:bg-cx-surface"
                >
                  Ask about this
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-cx-border p-6">
            <h3 className="font-display font-bold">Also available</h3>
            <ul className="mt-4 space-y-2 text-sm text-cx-muted">
              {EXTRAS.map(([label, price]) => (
                <li key={label} className="flex justify-between gap-6">
                  <span>{label}</span>
                  <span className="whitespace-nowrap font-semibold text-cx-text">
                    {price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 max-w-2xl text-sm text-cx-muted">
            Payment by M-Pesa or bank transfer. If a price does not fit your
            budget, say so — the price is for a fixed scope, so the scope can
            move even when the price cannot.
          </p>
        </div>
      </section>

      {/* ---------------- honesty ---------------- */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl sm:text-4xl">Before you ask — yes, I am new at this</h2>
        <div className="mt-8 max-w-2xl space-y-4 text-cx-muted">
          <p>
            I have been building these systems for my own business, not for a
            long list of clients. I would rather tell you that than invent
            testimonials you would find out about later.
          </p>
          <p>
            What I can show you instead is the work itself: a live system running
            on my own server, and a written log of all thirty-nine things that
            broke while I built it — what caused each one and how it was fixed.
          </p>
          <p>
            Most people selling automation cannot show you either. That is the
            trade I am offering: no client list, but you can see exactly how I
            work before you pay anything.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://automationarchitecthq.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-cx-border px-6 py-3 font-semibold transition hover:bg-cx-surface"
          >
            See a live system
          </a>
          <a
            href="https://youtu.be/ex356ENgQh0"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-cx-border px-6 py-3 font-semibold transition hover:bg-cx-surface"
          >
            Watch me break one on purpose
          </a>
        </div>
      </section>

      {/* ---------------- form ---------------- */}
      <section id="look" className="border-t border-cx-border bg-cx-surface/40">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-3xl sm:text-4xl">Get a free look at your business</h2>
          <p className="mt-4 text-cx-muted">
            Tell me what eats the most time. I will tell you what could run by
            itself, what it would cost, and whether it is even worth doing. No
            charge, no meeting required, no obligation.
          </p>

          {sent ? (
            <div className="mt-10 rounded-xl border border-cx-accent bg-cx-bg p-8">
              <h3 className="font-display text-xl font-bold">Got it.</h3>
              <p className="mt-3 text-cx-muted">
                I will come back to you shortly. If you would rather talk now,
                WhatsApp is faster.
              </p>
              <a
                href={waLink('Hi, I just filled in the form on your site.')}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-lg bg-gradient-to-r from-cx-accent to-cx-accent-end px-6 py-3 text-[19px] font-bold text-white"
              >
                Open WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">Your name</span>
                  <input
                    name="name"
                    className="mt-2 w-full rounded-lg border border-cx-border bg-cx-bg px-4 py-3 text-cx-text"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Business name</span>
                  <input
                    name="business"
                    className="mt-2 w-full rounded-lg border border-cx-border bg-cx-bg px-4 py-3 text-cx-text"
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
                  className="mt-2 w-full rounded-lg border border-cx-border bg-cx-bg px-4 py-3 text-cx-text"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold">
                  What takes the most time right now?
                </span>
                <textarea
                  name="problem"
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-cx-border bg-cx-bg px-4 py-3 text-cx-text"
                />
              </label>

              {error && (
                <p className="rounded-lg border border-cx-accent bg-cx-bg px-4 py-3 text-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-lg bg-gradient-to-r from-cx-accent to-cx-accent-end px-7 py-4 text-[19px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {busy ? 'Sending…' : 'Send it'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ---------------- footer ---------------- */}
      <footer className="border-t border-cx-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-cx-muted sm:flex-row sm:items-center sm:justify-between">
          <p>The Automation Architect · Mombasa, Kenya</p>
          <div className="flex flex-wrap gap-6">
            <a className="hover:text-cx-text" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <a
              className="hover:text-cx-text"
              href={waLink('Hi')}
              target="_blank"
              rel="noreferrer"
            >
              0717 252 826
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

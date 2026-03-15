'use client'

import { useState } from 'react'
import type { Paper } from '@/content/papers'

interface FormData {
  firstName: string
  lastName: string
  email: string
  title: string
  company: string
}

type State = 'idle' | 'loading' | 'success' | 'error' | 'coming-soon'

export default function PaperDownloadGate({ paper }: { paper: Paper }) {
  const [form, setForm]   = useState<FormData>({ firstName: '', lastName: '', email: '', title: '', company: '' })
  const [state, setState] = useState<State>(paper.available ? 'idle' : 'coming-soon')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.title || !form.company) {
      setError('All fields are required.')
      return
    }
    if (!form.email.includes('@') || form.email.endsWith('@gmail.com') || form.email.endsWith('@yahoo.com') || form.email.endsWith('@hotmail.com')) {
      setError('Please use your professional work email address.')
      return
    }

    setState('loading')

    try {
      const res = await fetch('/api/unlock-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, paperSlug: paper.slug, paperTitle: paper.title }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message || 'Something went wrong. Please try again.')
        setState('idle')
        return
      }

      setState('success')

      // Trigger download after short delay
      setTimeout(() => {
        window.location.href = `/api/download/${paper.pdfKey}`
      }, 1200)

    } catch {
      setError('Network error. Please try again.')
      setState('idle')
    }
  }

  // ── Coming Soon ──────────────────────────────────────────────────────────
  if (state === 'coming-soon') {
    return (
      <div className="paper-card p-7">
        <div className="section-label mb-4">Intelligence Report</div>
        <h3 className="font-display text-2xl font-light text-[#EEF3F9] mb-3">{paper.title}</h3>
        <div className="divider-gold my-5" />
        <div className="bg-[#B8952A]/10 border border-[#B8952A]/25 p-5 mb-5">
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#B8952A] mb-2">Publication Pending</p>
          <p className="text-[#8496AF] text-sm leading-relaxed">
            This Deep Insight report is finalizing. Enter your work email to be notified immediately upon release.
          </p>
        </div>
        <NotifyForm paperSlug={paper.slug} paperTitle={paper.title} />
      </div>
    )
  }

  // ── Success ───────────────────────────────────────────────────────────────
  if (state === 'success') {
    return (
      <div className="paper-card p-7">
        <div className="text-center py-8">
          <div className="w-14 h-14 border border-[#B8952A] flex items-center justify-center mx-auto mb-5 text-[#B8952A] text-2xl">
            ✓
          </div>
          <h3 className="font-display text-2xl font-light text-[#EEF3F9] mb-3">Access Granted</h3>
          <p className="text-[#8496AF] text-sm leading-relaxed mb-5">
            Your download is starting. A copy has also been sent to your work email.
          </p>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#B8952A]">
            A UEM Principal may follow up with insights specific to your asset.
          </p>
        </div>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="paper-card p-7">
      <div className="section-label mb-2">Unlock Full Report</div>
      <h3 className="font-display text-xl font-light text-[#EEF3F9] mb-1">{paper.title}</h3>
      <p className="text-[#8496AF] text-xs mb-5">15-page strategic intelligence report · 2025 Edition</p>

      <div className="divider-gold mb-6" />

      {/* What's inside */}
      <div className="space-y-2 mb-6">
        {[
          'Full market landscape & pipeline intelligence',
          'Commercial model frameworks & payer architecture',
          'Competitive white-space mapping',
          'The UEM operational execution bridge',
        ].map((item) => (
          <div key={item} className="flex gap-2 items-start">
            <span className="text-[#B8952A] text-xs mt-0.5">◆</span>
            <span className="text-[#8496AF] text-xs">{item}</span>
          </div>
        ))}
      </div>

      <div className="divider-gold mb-6" />

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-1.5">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First"
              className="input-field text-sm py-2.5"
              disabled={state === 'loading'}
            />
          </div>
          <div>
            <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-1.5">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last"
              className="input-field text-sm py-2.5"
              disabled={state === 'loading'}
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-1.5">Work Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className="input-field text-sm py-2.5"
            disabled={state === 'loading'}
          />
        </div>

        <div>
          <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-1.5">Title / Role</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Chief Commercial Officer"
            className="input-field text-sm py-2.5"
            disabled={state === 'loading'}
          />
        </div>

        <div>
          <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-1.5">Company</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Organization name"
            className="input-field text-sm py-2.5"
            disabled={state === 'loading'}
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs font-mono">{error}</p>
        )}

        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-primary w-full justify-center mt-2"
        >
          {state === 'loading' ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border border-[#06090F] border-t-transparent rounded-full" />
              Verifying...
            </>
          ) : (
            <>Unlock Full Report →</>
          )}
        </button>

        <p className="text-[#8496AF] text-[0.65rem] text-center leading-relaxed mt-1">
          Professional emails only. We respect your privacy — UEM never sells or shares contact data.
        </p>
      </form>
    </div>
  )
}

// ── Notify form (coming soon) ────────────────────────────────────────────────
function NotifyForm({ paperSlug, paperTitle }: { paperSlug: string; paperTitle: string }) {
  const [email, setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    await fetch('/api/unlock-paper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, paperSlug, paperTitle, notify: true }),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#B8952A]">
        ✓ You&apos;ll be notified upon release.
      </p>
    )
  }

  return (
    <form onSubmit={handleNotify} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@company.com"
        className="input-field text-sm py-2.5 flex-1"
      />
      <button type="submit" className="btn-primary py-2.5 px-4 text-xs whitespace-nowrap">
        Notify Me
      </button>
    </form>
  )
}

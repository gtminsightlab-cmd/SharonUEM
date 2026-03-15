'use client'

import { useState } from 'react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  title: string
  company: string
  therapeuticArea: string
  clinicalPhase: string
  primaryHurdle: string
  message: string
}

type State = 'idle' | 'loading' | 'success' | 'error'

const TAs = [
  'Oncology / Hematology', 'CNS / Neurology', 'Rare / Orphan Disease',
  'Cardiology / Cardiovascular', 'Immunology / Inflammation', 'Endocrinology / Metabolic',
  'Gastroenterology', 'Respiratory', 'Dermatology', 'Ophthalmology',
  'Nephrology / Urology', 'Musculoskeletal', 'Infectious Diseases', 'Other',
]

const Phases = [
  'Discovery / Preclinical', 'Phase I', 'Phase II', 'Phase III',
  'Pre-Launch / Launch', 'Post-Launch / Lifecycle',
]

const Hurdles = [
  'Commercial Strategy & Asset Valuation',
  'Payer Access & Market Entry',
  'Field Team Design & Deployment',
  'Fractional C-Suite / Interim Leadership',
  'Exit Valuation & M&A Readiness',
  'Investor Commercial Narrative',
]

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', title: '', company: '',
    therapeuticArea: '', clinicalPhase: '', primaryHurdle: '', message: '',
  })
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const required = ['firstName', 'lastName', 'email', 'title', 'company', 'therapeuticArea', 'clinicalPhase', 'primaryHurdle'] as const
    for (const field of required) {
      if (!form[field]) {
        setError('Please complete all required fields.')
        return
      }
    }

    setState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setState('success')
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
      setState('idle')
    }
  }

  if (state === 'success') {
    return (
      <div className="paper-card p-12 text-center">
        <div className="w-16 h-16 border border-[#B8952A] flex items-center justify-center mx-auto mb-6 text-[#B8952A] text-3xl">
          ✓
        </div>
        <h3 className="font-display text-3xl font-light text-[#EEF3F9] mb-3">Inquiry Received</h3>
        <p className="text-[#8496AF] leading-relaxed mb-2">
          A Founding Principal will review your inquiry and respond within 24 hours.
        </p>
        <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#B8952A]">
          You will hear directly from a Principal — not a coordinator.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-2">First Name *</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First" className="input-field" disabled={state === 'loading'} />
        </div>
        <div>
          <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-2">Last Name *</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last" className="input-field" disabled={state === 'loading'} />
        </div>
      </div>

      {/* Email + Title */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-2">Work Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className="input-field" disabled={state === 'loading'} />
        </div>
        <div>
          <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-2">Title / Role *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Chief Executive Officer" className="input-field" disabled={state === 'loading'} />
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-2">Company *</label>
        <input name="company" value={form.company} onChange={handleChange} placeholder="Organization name" className="input-field" disabled={state === 'loading'} />
      </div>

      {/* TA + Phase */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-2">Therapeutic Area *</label>
          <select name="therapeuticArea" value={form.therapeuticArea} onChange={handleChange} className="input-field" disabled={state === 'loading'}>
            <option value="">Select area...</option>
            {TAs.map((ta) => <option key={ta} value={ta}>{ta}</option>)}
          </select>
        </div>
        <div>
          <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-2">Clinical Phase *</label>
          <select name="clinicalPhase" value={form.clinicalPhase} onChange={handleChange} className="input-field" disabled={state === 'loading'}>
            <option value="">Select phase...</option>
            {Phases.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Primary hurdle */}
      <div>
        <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-2">Primary Strategic Hurdle *</label>
        <select name="primaryHurdle" value={form.primaryHurdle} onChange={handleChange} className="input-field" disabled={state === 'loading'}>
          <option value="">Select hurdle...</option>
          {Hurdles.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[#8496AF] block mb-2">
          Additional Context <span className="text-[#8496AF]/50">(optional)</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Brief description of your asset, stage, and what you're navigating..."
          rows={4}
          className="input-field resize-none"
          disabled={state === 'loading'}
        />
      </div>

      {error && <p className="text-red-400 text-sm font-mono">{error}</p>}

      <button type="submit" disabled={state === 'loading'} className="btn-primary w-full justify-center py-4">
        {state === 'loading' ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border border-[#06090F] border-t-transparent rounded-full" />
            Submitting...
          </>
        ) : (
          <>Request a Principal Dialogue →</>
        )}
      </button>

      <p className="text-[#8496AF] text-xs text-center">
        All inquiries are reviewed by a Founding Principal within 24 hours.
        We do not use automated screeners or junior coordinators.
      </p>
    </form>
  )
}

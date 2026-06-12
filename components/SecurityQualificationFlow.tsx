'use client'

import { useState, useEffect, useCallback } from 'react'
import BookingCalendar from './BookingCalendar'

// ─── London validation (VERBATIM COPY - DO NOT MODIFY) ──────────────────────
const londonPfx = ["E","EC","N","NW","SE","SW","W","WC","BR","CR","DA","EN","HA","IG","KT","RM","SM","TW","UB","WD"]
function isLondon(pc: string): boolean | null {
  const c = pc.toUpperCase().replace(/\s+/g,"")
  if (c.length < 2) return null
  const pfx = c.match(/^[A-Z]+/)?.[0] || ""
  return londonPfx.includes(pfx) ? true : false
}

// ─── Types ───────────────────────────────────────────────────────────────────
type Screen =
  | 'welcome' | 'premises' | 'service' | 'hours' | 'postcode'
  | 'result' | 'thank-you' | 'outside-london'

interface Ans {
  premises: string
  service: string
  hours: string
  postcode: string
  preferredStart: string
  contractLength: string
  name?: string
  email?: string
  company?: string
  bookedSlot?: string
}

const INIT: Ans = {
  premises: '',
  service: '',
  hours: '',
  postcode: '',
  preferredStart: '',
  contractLength: '',
}

// ─── Acknowledgement lines ───────────────────────────────────────────────────
const ACK_PREMISES: Record<string, string> = {
  commercial: 'Good. Let us match you to the right security programme.',
  construction: 'Construction sites need reliable experienced officers. We cover that.',
  events: 'Events security requires specialist experience. We have it.',
}

const ACK_SERVICE = 'Got it. Now let us understand your cover requirements.'

const ACK_HOURS: Record<string, string> = {
  'day-shift': 'Good. Day cover is our most requested service.',
  'night-shift': 'Noted. Night cover requires experienced officers — we have them.',
  'weekend': 'Weekend cover arranged. We will match you with available officers.',
  '247': '24/7 cover requires careful planning. We will discuss staffing in the call.',
  'out-of-hours': 'Out of hours cover confirmed. We specialise in evening and weekend response.',
}

// ─── Service options by premises ─────────────────────────────────────────────
const SERVICE_OPTIONS: Record<string, Array<{ value: string; label: string; desc: string }>> = {
  commercial: [
    { value: 'manned-guarding', label: 'Manned guarding', desc: 'SIA-licensed officers on site' },
    { value: 'mobile-patrols', label: 'Mobile patrols', desc: 'Regular security patrols' },
    { value: 'key-holding', label: 'Key holding & alarm response', desc: '24/7 alarm response service' },
    { value: 'cctv', label: 'CCTV monitoring', desc: 'Remote surveillance monitoring' },
  ],
  construction: [
    { value: 'site-security', label: 'Site security', desc: 'Construction site protection' },
    { value: 'mobile-patrols', label: 'Mobile patrols', desc: 'Regular site checks' },
    { value: 'access-control', label: 'Access control', desc: 'Site access management' },
  ],
  events: [
    { value: 'event-security', label: 'Event security', desc: 'Event protection services' },
    { value: 'door-supervision', label: 'Door supervision', desc: 'Licensed door supervisors' },
    { value: 'crowd-management', label: 'Crowd management', desc: 'Crowd control services' },
  ],
}

// ─── Trust pills by premises ─────────────────────────────────────────────────
const TRUST_PILLS: Record<string, string> = {
  commercial: 'SIA-licensed officers · £10M insured · Greater London coverage',
  construction: 'Site security experience · DBS-checked officers · £10M insured',
  events: 'Door supervision licensed · Crowd management · £10M insured',
}

// ─── Testimonials ────────────────────────────────────────────────────────────
const TESTIMONIALS: Record<string, { quote: string; cite: string }> = {
  commercial: {
    quote: "We needed a professional security team for our central London offices. Vigil has been flawless — discreet, reliable and visibly effective every day.",
    cite: "Facilities Director, Corporate office — EC2"
  },
  construction: {
    quote: "Site security is non-negotiable for our projects. Vigil's officers show up on time, know what they're doing, and don't need micromanaging.",
    cite: "Project Manager, Main contractor — SE1"
  },
  events: {
    quote: "Our events range from 200 to 2,000 attendees. Vigil's door supervisors are professional, licensed, and handle pressure calmly.",
    cite: "Events Director, Venue operator — W1"
  },
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function SecurityQualificationFlow() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [hist, setHist] = useState<Screen[]>([])
  const [ans, setAns] = useState<Ans>(INIT)
  const [pcVal, setPcVal] = useState('')
  const [pcStatus, setPcStatus] = useState<'idle'|'ok'|'outside'>('idle')
  const [ack, setAck] = useState('')
  const [briefSubmitted, setBriefSubmitted] = useState(false)

  const go = useCallback((to: Screen, acknowledgement?: string) => {
    setHist(prev => [...prev, screen])
    setScreen(to)
    if (acknowledgement) {
      setAck(acknowledgement)
      setTimeout(() => setAck(''), 2000)
    }
  }, [screen])

  const back = () => {
    if (hist.length === 0) return
    const prev = hist[hist.length - 1]
    setHist(hist.slice(0, -1))
    setScreen(prev)
  }

  // Auto-submit brief when result screen loads
  useEffect(() => {
    if (screen !== 'result' || briefSubmitted) return

    const submitBrief = async () => {
      try {
        await fetch('/api/qualify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: ans.name || 'Not captured',
            email: ans.email || '',
            company: ans.company || '',
            premises: ans.premises,
            premisesType: ans.premises,
            service: ans.service,
            serviceType: ans.service,
            hours: ans.hours,
            postcode: ans.postcode,
            preferredStart: ans.preferredStart,
            startPreference: ans.preferredStart,
            contractLength: ans.contractLength,
            bookedSlot: ans.bookedSlot || '',
          }),
        })
        setBriefSubmitted(true)
      } catch (err) {
        console.error('Brief submission error:', err)
      }
    }

    submitBrief()
  }, [screen, ans, briefSubmitted])


  // ─── Screens ─────────────────────────────────────────────────────────────────

  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-navy pt-20 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-tag justify-center mb-6">Security matching</p>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-medium leading-tight mb-6 text-white">
            The security partner that shows up,{' '}
            <em className="text-[#4ecdc4] not-italic italic">stays sharp, and reports everything</em>
          </h2>
          <p className="text-[rgba(255,255,255,0.65)] text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Answer four quick questions and we'll match you to the right security programme for your premises.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {['SIA-licensed officers', 'DBS-checked', 'Directly employed', '£10M insured', 'Greater London'].map(pill => (
              <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">
                {pill}
              </span>
            ))}
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-6 pt-8 mb-10 border-t border-white/10">
            {[
              { label: '£10M', desc: 'Insured' },
              { label: 'Directly', desc: 'Employed' },
              { label: '24/7', desc: 'Cover Available' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-[#4ecdc4] font-display text-2xl font-medium mb-1">{stat.label}</div>
                <div className="text-white/50 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>

          <button onClick={() => go('premises')} className="btn-primary text-base px-8 py-4">
            Start matching →
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'premises') {
    return (
      <div className="min-h-screen bg-navy pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {ack && (
            <div className="mb-6 bg-[rgba(78,205,196,0.15)] border-l-4 border-[#4ecdc4] rounded-r-lg px-6 py-3 text-[#4ecdc4] font-medium">
              {ack}
            </div>
          )}
          <button onClick={back} className="text-white/50 hover:text-white text-sm mb-6">← Back</button>
          <p className="section-tag mb-4">Question 1 of 4</p>
          <h2 className="font-display text-[clamp(28px,3vw,42px)] font-medium text-white mb-8">
            What type of premises do you need to secure?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { value: 'commercial', label: 'Commercial', desc: 'Offices, retail, hospitality' },
              { value: 'construction', label: 'Construction & Industrial', desc: 'Sites, warehouses, yards' },
              { value: 'events', label: 'Events & Specialist', desc: 'Events, venues, exhibitions' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  setAns({ ...ans, premises: opt.value })
                  go('service', ACK_PREMISES[opt.value])
                }}
                className="group bg-navy-light border-2 border-white/10 rounded-xl p-6 text-left hover:border-[#4ecdc4] transition-all"
              >
                <div className="w-3 h-3 rounded-full bg-[#4ecdc4] mb-4" />
                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#4ecdc4] transition-colors">{opt.label}</h3>
                <p className="text-white/50 text-sm">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'service') {
    const options = SERVICE_OPTIONS[ans.premises] || []
    return (
      <div className="min-h-screen bg-navy pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {ack && (
            <div className="mb-6 bg-[rgba(78,205,196,0.15)] border-l-4 border-[#4ecdc4] rounded-r-lg px-6 py-3 text-[#4ecdc4] font-medium">
              {ack}
            </div>
          )}
          <button onClick={back} className="text-white/50 hover:text-white text-sm mb-6">← Back</button>
          <p className="section-tag mb-4">Question 2 of 4</p>
          <h2 className="font-display text-[clamp(28px,3vw,42px)] font-medium text-white mb-8">
            Which security service do you need?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  setAns({ ...ans, service: opt.value })
                  go('hours', ACK_SERVICE)
                }}
                className="group bg-navy-light border-2 border-white/10 rounded-xl p-6 text-left hover:border-[#4ecdc4] transition-all"
              >
                <div className="w-3 h-3 rounded-full bg-[#4ecdc4] mb-4" />
                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#4ecdc4] transition-colors">{opt.label}</h3>
                <p className="text-white/50 text-sm">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'hours') {
    return (
      <div className="min-h-screen bg-navy pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {ack && (
            <div className="mb-6 bg-[rgba(78,205,196,0.15)] border-l-4 border-[#4ecdc4] rounded-r-lg px-6 py-3 text-[#4ecdc4] font-medium">
              {ack}
            </div>
          )}
          <button onClick={back} className="text-white/50 hover:text-white text-sm mb-6">← Back</button>
          <p className="section-tag mb-4">Question 3 of 4</p>
          <h2 className="font-display text-[clamp(28px,3vw,42px)] font-medium text-white mb-8">
            When do you need cover?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { value: 'day-shift', label: 'Day shift', desc: '7am – 7pm', icon: 'ti-sun' },
              { value: 'night-shift', label: 'Night shift', desc: '7pm – 7am', icon: 'ti-moon' },
              { value: 'weekend', label: 'Weekend cover', desc: 'Saturday & Sunday', icon: 'ti-calendar-week' },
              { value: '247', label: '24/7 round the clock', desc: 'Continuous cover', icon: 'ti-clock-24' },
              { value: 'out-of-hours', label: 'Out of hours', desc: 'Evenings & weekends', icon: 'ti-clock-off' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  setAns({ ...ans, hours: opt.value })
                  go('postcode', ACK_HOURS[opt.value] || 'Almost there — one last thing.')
                }}
                className="group bg-navy-light border-2 border-white/10 rounded-xl p-6 text-left hover:border-[#4ecdc4] transition-all"
              >
                <div className="w-3 h-3 rounded-full bg-[#4ecdc4] mb-4" />
                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#4ecdc4] transition-colors">{opt.label}</h3>
                <p className="text-white/50 text-sm">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'postcode') {
    const handlePostcode = () => {
      const check = isLondon(pcVal)
      if (check === null) {
        setPcStatus('idle')
        return
      }
      if (check) {
        setAns({ ...ans, postcode: pcVal })
        setPcStatus('ok')
        go('result')
      } else {
        setPcStatus('outside')
        go('outside-london')
      }
    }

    return (
      <div className="min-h-screen bg-navy pt-20 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          {ack && (
            <div className="mb-6 bg-[rgba(78,205,196,0.15)] border-l-4 border-[#4ecdc4] rounded-r-lg px-6 py-3 text-[#4ecdc4] font-medium">
              {ack}
            </div>
          )}
          <button onClick={back} className="text-white/50 hover:text-white text-sm mb-6">← Back</button>
          <p className="section-tag mb-4">Question 4 of 4</p>
          <h2 className="font-display text-[clamp(28px,3vw,42px)] font-medium text-white mb-6">
            What's the site postcode?
          </h2>
          <p className="text-white/60 text-base mb-8">
            We serve Greater London. Enter your postcode to confirm coverage.
          </p>

          <div className="max-w-md">
            <input
              type="text"
              value={pcVal}
              onChange={(e) => setPcVal(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handlePostcode()}
              placeholder="e.g. E14 5AB"
              className="w-full bg-navy-light border-2 border-white/20 rounded-lg px-6 py-4 text-white text-lg focus:border-[#4ecdc4] focus:outline-none transition-colors"
            />
            <button onClick={handlePostcode} className="btn-primary w-full mt-4 text-base px-8 py-4">
              Check coverage →
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'outside-london') {
    return (
      <div className="min-h-screen bg-navy pt-20 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-[rgba(78,205,196,0.15)] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[#4ecdc4] text-2xl">📍</span>
          </div>
          <h2 className="font-display text-[clamp(28px,3vw,42px)] font-medium text-white mb-6">
            We don't currently cover {pcVal}
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Vigil Security operates exclusively within Greater London. Your postcode falls outside our service area.
          </p>
          <p className="text-white/60 text-base mb-8">
            If you believe this is an error, please contact us directly at{' '}
            <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>
          </p>
          <button onClick={() => { setScreen('welcome'); setPcVal(''); setAns(INIT); setHist([]) }} className="btn-outline">
            Start over
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'result') {
    return (
      <div className="min-h-screen bg-navy pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-5 py-2 text-[#4ecdc4] font-medium mb-4">
              {TRUST_PILLS[ans.premises]}
            </div>
            <h2 className="font-display text-[clamp(28px,3vw,42px)] font-medium text-white mb-4">
              Perfect. Here's what happens next.
            </h2>
            <p className="text-white/60 text-lg">
              Book a free discovery call below — we'll assess your requirements and provide a tailored quote.
            </p>
          </div>

          {/* Brief card */}
          <div className="bg-navy-mid border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-white font-medium text-lg mb-4">Your security brief</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-white/40 text-sm mb-1">Premises type</div>
                <div className="text-white capitalize">{ans.premises}</div>
              </div>
              <div>
                <div className="text-white/40 text-sm mb-1">Service</div>
                <div className="text-white capitalize">{ans.service.replace(/-/g, ' ')}</div>
              </div>
              <div>
                <div className="text-white/40 text-sm mb-1">Hours</div>
                <div className="text-white capitalize">{ans.hours.replace(/-/g, ' ')}</div>
              </div>
              <div>
                <div className="text-white/40 text-sm mb-1">Location</div>
                <div className="text-white">{ans.postcode}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Preferred start</label>
                <select
                  value={ans.preferredStart}
                  onChange={(e) => setAns({ ...ans, preferredStart: e.target.value })}
                  className="w-full bg-navy-light border border-white/20 rounded-lg px-4 py-2 text-white focus:border-[#4ecdc4] focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1-2weeks">1-2 weeks</option>
                  <option value="1month">1 month</option>
                  <option value="2-3months">2-3 months</option>
                  <option value="planning">Just planning ahead</option>
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Contract length</label>
                <select
                  value={ans.contractLength}
                  onChange={(e) => setAns({ ...ans, contractLength: e.target.value })}
                  className="w-full bg-navy-light border border-white/20 rounded-lg px-4 py-2 text-white focus:border-[#4ecdc4] focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="6months">6 months</option>
                  <option value="12months">12 months</option>
                  <option value="24months">24 months</option>
                  <option value="ongoing">Ongoing / rolling</option>
                </select>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-navy-mid border-l-4 border-[#4ecdc4] rounded-r-xl p-6 mb-8">
            <div className="text-[#c9a84c] text-sm mb-3 tracking-wider">★★★★★</div>
            <p className="text-white/75 italic leading-relaxed mb-4">
              &ldquo;{TESTIMONIALS[ans.premises].quote}&rdquo;
            </p>
            <p className="text-white/50 text-sm">{TESTIMONIALS[ans.premises].cite}</p>
          </div>

          {/* Booking calendar */}
          <div className="mb-6">
            <h3 className="text-white font-medium text-lg mb-4 text-center">Book your free discovery call</h3>
            <BookingCalendar
              division="security"
              answers={{
                premisesType: ans.premises,
                serviceType: ans.service,
                hours: ans.hours,
                postcode: ans.postcode,
                startPreference: ans.preferredStart,
                contractLength: ans.contractLength
              }}
              onBookingComplete={(booking) => {
                setAns(prev => ({
                  ...prev,
                  name: booking.name,
                  email: booking.email,
                  company: booking.company,
                  bookedSlot: `${booking.date} at ${booking.time}`
                }))
                go('thank-you')
              }}
            />
          </div>

          {/* Ghost button */}
          <div className="text-center">
            <a href="mailto:security@vigilservices.co.uk" className="text-white/60 hover:text-[#4ecdc4] text-sm underline">
              Prefer to email your brief instead →
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'thank-you') {
    return (
      <div className="min-h-screen bg-navy pt-20 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-[rgba(78,205,196,0.15)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#4ecdc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-[clamp(28px,3vw,42px)] font-medium text-white mb-4">
            Discovery call confirmed
          </h2>
          <p className="text-white/60 text-lg mb-4">
            Your confirmation has been sent by email. We will review your brief before the call and come prepared.
          </p>
          <p className="text-white/50 text-base mb-8">
            Questions in the meantime — call{' '}
            <a href="tel:02039738892" className="text-[#4ecdc4] hover:underline">020 3973 8892</a>
            {' '}or email{' '}
            <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] hover:underline">security@vigilservices.co.uk</a>
          </p>
          <a href="/" className="btn-outline inline-block">
            Back to homepage
          </a>
        </div>
      </div>
    )
  }

  return null
}

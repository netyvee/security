'use client'

import { useState } from 'react'

interface BookingCalendarProps {
  division: 'security' | 'cleaning'
  answers: {
    premises?: string
    premisesType?: string
    service?: string
    serviceType?: string
    hours?: string
    postcode?: string
    preferredStart?: string
    startPreference?: string
    contractLength?: string
  }
  onBookingComplete: (booking: {
    date: string
    time: string
    name: string
    company: string
    email: string
    phone: string
  }) => void
}

type Step = 'details' | 'date' | 'time' | 'confirm'

export default function BookingCalendar({ division, answers, onBookingComplete }: BookingCalendarProps) {
  const [step, setStep] = useState<Step>('details')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate 14 working days (Mon-Fri only)
  const generateWorkingDays = () => {
    const days: Date[] = []
    const today = new Date()
    let current = new Date(today)
    current.setDate(current.getDate() + 1) // Start from tomorrow

    while (days.length < 14) {
      const dayOfWeek = current.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
        days.push(new Date(current))
      }
      current.setDate(current.getDate() + 1)
    }
    return days
  }

  const workingDays = generateWorkingDays()

  // Time slots: 10:00 to 14:00 in 30-minute intervals
  const timeSlots = [
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00'
  ]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleDetailsNext = () => {
    if (name && email && phone) {
      setStep('date')
    }
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date.toISOString())
    setStep('time')
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep('confirm')
  }

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return

    setIsSubmitting(true)

    const bookedDate = new Date(selectedDate)
    const bookedSlot = `${formatFullDate(bookedDate)} at ${selectedTime}`

    try {
      // Submit booking to API
      const response = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          premisesType: answers.premisesType || answers.premises || 'Not specified',
          serviceType: answers.serviceType || answers.service || 'Not specified',
          hours: answers.hours || 'Not specified',
          postcode: answers.postcode || 'Not specified',
          startPreference: answers.startPreference || answers.preferredStart || 'Not specified',
          contractLength: answers.contractLength || 'Not specified',
          bookedSlot,
          source: 'booking-calendar'
        })
      })

      const result = await response.json()

      if (result.success) {
        onBookingComplete({
          date: formatFullDate(bookedDate),
          time: selectedTime,
          name,
          company,
          email,
          phone
        })
      } else {
        alert('Booking failed. Please try again or contact us directly.')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Booking failed. Please try again or contact us directly.')
      setIsSubmitting(false)
    }
  }

  // Step 1: Contact Details
  if (step === 'details') {
    return (
      <div className="bg-[#0f1f3d] border border-white/10 rounded-xl p-6">
        <div className="mb-6">
          <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Step 1 of 4</div>
          <h3 className="text-white text-xl font-medium">Your contact details</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-white/60 text-sm mb-2 block">Full name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className="w-full bg-[#0a1628] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#4ecdc4] focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Company name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your Company Ltd"
              className="w-full bg-[#0a1628] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#4ecdc4] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Email address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@company.com"
              className="w-full bg-[#0a1628] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#4ecdc4] focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Phone number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07700 900000"
              className="w-full bg-[#0a1628] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#4ecdc4] focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        <button
          onClick={handleDetailsNext}
          disabled={!name || !email || !phone}
          className="w-full mt-6 bg-[#4ecdc4] hover:bg-[#3db5ad] disabled:bg-white/10 disabled:cursor-not-allowed text-[#0a1628] disabled:text-white/40 font-medium py-3 rounded-lg transition-colors"
        >
          Continue to date selection →
        </button>
      </div>
    )
  }

  // Step 2: Date Selection
  if (step === 'date') {
    return (
      <div className="bg-[#0f1f3d] border border-white/10 rounded-xl p-6">
        <div className="mb-6">
          <button
            onClick={() => setStep('details')}
            className="text-white/50 hover:text-white text-sm mb-3"
          >
            ← Back
          </button>
          <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Step 2 of 4</div>
          <h3 className="text-white text-xl font-medium">Choose a date</h3>
          <p className="text-white/50 text-sm mt-2">Select a day for your 30-minute discovery call</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {workingDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              className="bg-[#0a1628] hover:bg-[#162849] border border-white/10 hover:border-[#4ecdc4] rounded-lg p-4 text-left transition-all group"
            >
              <div className="text-[#4ecdc4] text-sm font-medium mb-1 group-hover:text-[#4ecdc4]">
                {formatDate(day)}
              </div>
              <div className="text-white/60 text-xs group-hover:text-white/80">
                {day.getFullYear()}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Step 3: Time Selection
  if (step === 'time') {
    const bookedDate = new Date(selectedDate)

    return (
      <div className="bg-[#0f1f3d] border border-white/10 rounded-xl p-6">
        <div className="mb-6">
          <button
            onClick={() => setStep('date')}
            className="text-white/50 hover:text-white text-sm mb-3"
          >
            ← Back
          </button>
          <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Step 3 of 4</div>
          <h3 className="text-white text-xl font-medium">Choose a time</h3>
          <p className="text-white/50 text-sm mt-2">
            {formatFullDate(bookedDate)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className="bg-[#0a1628] hover:bg-[#162849] border border-white/10 hover:border-[#4ecdc4] rounded-lg p-4 text-center transition-all group"
            >
              <div className="text-white text-base font-medium group-hover:text-[#4ecdc4]">
                {time}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Step 4: Confirmation
  if (step === 'confirm') {
    const bookedDate = new Date(selectedDate)

    return (
      <div className="bg-[#0f1f3d] border border-white/10 rounded-xl p-6">
        <div className="mb-6">
          <button
            onClick={() => setStep('time')}
            className="text-white/50 hover:text-white text-sm mb-3"
          >
            ← Back
          </button>
          <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Step 4 of 4</div>
          <h3 className="text-white text-xl font-medium">Confirm your booking</h3>
        </div>

        <div className="bg-[#0a1628] border border-[#4ecdc4]/30 rounded-lg p-5 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-2xl">📅</div>
            <div>
              <div className="text-white font-medium text-lg">{formatFullDate(bookedDate)}</div>
              <div className="text-[#4ecdc4] font-medium">{selectedTime}</div>
              <div className="text-white/50 text-sm mt-1">30-minute discovery call · Phone</div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Name</span>
              <span className="text-white">{name}</span>
            </div>
            {company && (
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Company</span>
                <span className="text-white">{company}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Email</span>
              <span className="text-white">{email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Phone</span>
              <span className="text-white">{phone}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full bg-[#4ecdc4] hover:bg-[#3db5ad] disabled:bg-white/10 disabled:cursor-not-allowed text-[#0a1628] disabled:text-white/40 font-medium py-3 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Confirming...' : 'Confirm discovery call →'}
        </button>

        <p className="text-white/40 text-xs text-center mt-4">
          You will receive a confirmation email after booking
        </p>
      </div>
    )
  }

  return null
}

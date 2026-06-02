import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      premises,
      service,
      hours,
      postcode,
      preferredStart,
      contractLength,
      serviceType,
    } = body

    // Send to CRM
    const crmEndpoint = process.env.NEXT_PUBLIC_CRM_ENDPOINT || 'https://app.vigilservices.co.uk/enquiry'

    try {
      await fetch(crmEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          service_type: 'Security',
          premises_type: premises,
          service_required: service,
          hours_required: hours,
          postcode,
          preferred_start: preferredStart,
          contract_length: contractLength,
          source: 'Security Website Qualification Flow',
          created_at: new Date().toISOString(),
        }),
      })
    } catch (crmError) {
      console.error('CRM submission error:', crmError)
      // Don't fail the request if CRM is down
    }

    // Email notification via Gmail SMTP
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        })

        const emailSubject = `New security enquiry — ${premises} — ${postcode}`
        const emailHtml = `
          <h2>New Security Enquiry</h2>
          <p><strong>Premises Type:</strong> ${premises}</p>
          <p><strong>Service Required:</strong> ${service}</p>
          <p><strong>Hours:</strong> ${hours}</p>
          <p><strong>Location:</strong> ${postcode}</p>
          <p><strong>Preferred Start:</strong> ${preferredStart || 'Not specified'}</p>
          <p><strong>Contract Length:</strong> ${contractLength || 'Not specified'}</p>
          <p><strong>Source:</strong> Security Website Qualification Flow</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB')}</p>
        `

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: 'vigsecs@gmail.com',
          subject: emailSubject,
          html: emailHtml,
        })
      } catch (emailError) {
        console.error('Email notification error:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Qualification submission error:', error)
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 })
  }
}
